export interface CategoryIcon {
  /** 카테고리 아이콘 id */
  categoryId: string;
  /** 아이콘 id */
  iconId: string;
  /** 앱 아이콘 여부 */
  isMapIcon: boolean;
  /** 아이콘 경로 */
  iconPath: string;
}

export interface Category {
  /** 카테고리 ID */
  id: string;
  /** 카테고리 이름 */
  name: string;
  /** 아이콘 */
  icons: CategoryIcon[];
  /** 홈 카테고리 여부 */
  isHome: boolean;
  /** 추천 여부 */
  isRecommended: boolean;
}
