export interface Exhibition {
  /** 기획전 id */
  id: string;
  /** 기획전 제목 */
  title: string;
  /** 기획전 썸네일 */
  thumbnail: string;
  /** 기획전 부가설명 */
  description: string;
  /** 기획전 내용 */
  content: string;
  /** 기획전 시작 */
  startAt: Date;
  /** 기획전 끝 */
  endAt: Date;
  /** 기획전 생성일 */
  createdAt: Date;
}
