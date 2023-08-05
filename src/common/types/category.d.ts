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
