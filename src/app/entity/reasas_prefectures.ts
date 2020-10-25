import { Prefecture } from './prefecture';

export interface ReasasPrefectures {
    /** API結果メッセージ */
    message: string;
    /** API取得結果 */
    result: Prefecture[];
}
