import type { DateDTO } from "./common";

export interface Announcement extends DateDTO {
  /** 공지사항 ID */
  id: string;
  /** 공지사항 제목 */
  title: string;
  /** 공지사항 내용 */
  content: string;
}
