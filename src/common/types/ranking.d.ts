import type { Space } from "./space";

export interface Ranking {
  /** 이름 */
  name: string;
  /** 설명 */
  description: string;
  /** 공간 */
  spaces: Space[];
}
