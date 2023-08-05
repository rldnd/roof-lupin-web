import type { Space } from "./space";

export interface ContentCategory {
  /** 카테고리 아이디 */
  id: string;
  /** 카테고리 이름 */
  name: string;
  /** 카테고리 하이라이트 텍스트 */
  highlight: string | null;
  /** 카테고리 공간 */
  spaces: Space[];
}
