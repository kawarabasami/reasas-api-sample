import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { PopTransition } from './entity/pop_transition';
import { Prefecture } from './entity/prefecture';
import { ReasasPopTransition } from './entity/reasas_pop_transition';
import { ReasasPrefectures } from './entity/reasas_prefectures';

@Injectable({
  providedIn: 'root'
})
export class ReasasApiService {

  /**
   * Reasas APIのAPIエンドポイント.
   *
   * @private
   * @memberof ReasasApiService
   */
  private readonly _apiEndpoint = 'https://opendata.resas-portal.go.jp.';

  /**
   * Reasas APIのHTTPリクエストオプション.
   *
   * @private
   * @memberof ReasasApiService
   */
  private readonly _httpOptions = {
    headers: new HttpHeaders(
      {
        'Content-Type': 'application/json;charset=UTF-8',
        'X-API-KEY': 'VPfu4CY23slDQ05jdgt04exFDFmQY2zJXFAESgdR'
      },
    )
  };

  /**
   * 都道府県一覧取得用URL.
   *
   * @private
   * @memberof ReasasApiService
   */
  private readonly _apiUrlPrefectures = 'api/v1/prefectures';

  /**
   * 人口構成取得用URL.
   *
   * @private
   * @memberof ReasasApiService
   */
  private readonly _apiUrlPopCompYear = 'api/v1/population/composition/perYear';

  /**
   * コンストラクタ.
   * @param http 
   */
  constructor(private http: HttpClient,) { }

  /**
   * 都道府県一覧を取得する.
   *
   * @return {*}  {Observable<Prefecture[]>}
   * @memberof ReasasApiService
   */
  getPrefectures(): Observable<Prefecture[]> {

    // リクエストURL生成
    const reqestUrl = `${this._apiEndpoint}/${this._apiUrlPrefectures}`;

    // HTTPリクエストを投げる
    return this.http.get<ReasasPrefectures>(reqestUrl, this._httpOptions)
      .pipe(
        map((reasasPref) => {
          // 取得結果から都道府県一覧データのみ取り出して返却
          return reasasPref.result;
        }),
      );
  }

  /**
   * 指定した都道府県の人口推移を取得する.
   *
   * @return {*}  {Observable<Prefecture[]>}
   * @memberof ReasasApiService
   */
  getPopTransition(pref: Prefecture): Observable<PopTransition[]> {

    // リクエストURL生成
    const reqestUrl = `${this._apiEndpoint}/${this._apiUrlPopCompYear}?cityCode=-&prefCode=${pref.prefCode}`;

    // HTTPリクエストを投げる
    return this.http.get<ReasasPopTransition>(reqestUrl, this._httpOptions)
      .pipe(
        map((reasasPopTrans) => {
          // 取得結果から総人口のデータのみ取り出す
          const total = reasasPopTrans.result.data.find((data) => data.label === '総人口');

          return total != null ? total.data : [];
        }),
      );
  }
}
