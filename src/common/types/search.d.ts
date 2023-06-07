export interface SearchRecord {
  /** search record id */
  id: string;
  /** 검색어 */
  content: string;
  /** 작성자 ID */
  userId: string;
  /** 검색일자 */
  createdAt: Date;
}

export interface SearchRecommend {
  /** search recommend id */
  id: string;
  /** 검색어 */
  content: string;
}
