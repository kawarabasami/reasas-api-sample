import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Prefecture } from './entity/prefecture';
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
   * ログ出力用処理.
   * @param message 
   */
  private _log(message: string) {
    console.log(message);
  }
}
