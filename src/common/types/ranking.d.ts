import type { Space } from "./space";

export interface Ranking {
  /** 랭킹 ID */
  id: string;
  /** 이름 */
  name: string;
  /** 설명 */
  description: string;
  /** 공간 */
  spaces: Space[];
}
