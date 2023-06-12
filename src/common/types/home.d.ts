import type { Space } from "./space";

export interface HomeContent {
  /** 홈 컨텐츠 ID */
  id: string;
  /** 홈 컨텐츠 이름 */
  name: string;
  /** 홈 컨텐츠 하이라이트 */
  highlight: string | null;
  /** 홈 컨텐츠 공간 */
  spaces: Space[];
}
