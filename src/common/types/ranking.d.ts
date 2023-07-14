import type { Space } from "./space";

export interface Ranking {
  /** 이름 */
  name: string;
  /** 공간 */
  spaces: Space[];
}
