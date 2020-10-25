import { Component } from '@angular/core';
import { Chart } from 'angular-highcharts';
import { Subscription } from 'rxjs';
import { Prefecture } from './entity/prefecture';
import { ReasasApiService } from './reasas-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  /**
   * 折れ線グラフ表示用.
   *
   * @type {Chart}
   * @memberof AppComponent
   */
  chart: Chart = new Chart({
    chart: {
      type: 'line'
    },
    title: {
      text: '',
    },
    credits: {
      enabled: false
    },
    xAxis: {
      title: { text: '年度' },

    },
    yAxis: {
      title: { text: '総人口' }
    },
    legend: {
      align: 'right',
      layout: 'vertical',
      verticalAlign: 'top',
    },
    series: [
    ]
  });

  /**
   * 都道府県一覧データ.
   *
   * @type {Prefecture[]}
   * @memberof AppComponent
   */
  prefectures: Prefecture[] = [];

  /**
   * 都道府県一覧 インデックス情報管理用.
   *
   * @memberof AppComponent
   */
  addedChartPrefs: Prefecture[] = [];

  /**
   * イベント購読解除用.
   *
   * @private
   * @memberof AppComponent
   */
  private _subsc = new Subscription();

  constructor(private reasasApiSvc: ReasasApiService) { }

  /** 初期処理 */
  ngOnInit() {

    // 都道府県一覧を取得する
    this._subsc.add(this.reasasApiSvc.getPrefectures().subscribe((data) => {
      this.prefectures = data;
    }));

  }

  /** 破棄処理 */
  ngOnDestroy() {
    // イベント購読を解除
    this._subsc.unsubscribe();
  }

  /**
   *  チェックボックスON/OFF切替時の処理.
   *  チャートへのグラフ追加/削除を行う.
   * 
   * @param isChecked 
   * @param pref 
   */
  onCheckboxChanged(isChecked: boolean, pref: Prefecture) {

    if (isChecked) {
      this.addedChartPrefs.push(pref);
      this.chart.addSeries({
        name: `${pref.prefName}`,
        type: 'line',
        data: [
          [1990, Math.floor(Math.random() * 10)],
          [2000, Math.floor(Math.random() * 10)],
          [2010, Math.floor(Math.random() * 10)]
        ]
      }, true, true);
    } else {
      const idx = this.addedChartPrefs.findIndex(item => item.prefCode === pref.prefCode);
      if (idx != null) {
        this.chart.removeSeries(idx);
        this.addedChartPrefs = this.addedChartPrefs.filter(item => item.prefCode !== pref.prefCode);
      }
    }
  }

}
