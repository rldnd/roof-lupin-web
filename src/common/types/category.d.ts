import type { Space } from "./space";

export interface Category {
  /** 카테고리 ID */
  id: string;
  /** 카테고리 이름 */
  name: string;
  /** 아이콘 경로 */
  iconPath?: string;
  /** 홈 카테고리 여부 */
  isHome: boolean;
  /** 추천 여부 */
  isRecommended: boolean;
}

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
