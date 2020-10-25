import { PopTransition } from './pop_transition';

export interface ReasasPopTransition {
    /** API結果メッセージ */
    message: string;
    /** API取得結果 */
    result: {
        boundaryYear: number;
        data: {
            label: string;
            data: PopTransition[];
        }[];
    };
}
