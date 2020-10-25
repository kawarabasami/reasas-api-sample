import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Prefecture } from './entity/prefecture';
import { ReasasApiService } from './reasas-api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'reasas-api-sample';

  prefectures: Prefecture[] = [];

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
}
