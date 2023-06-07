import type { DateDTO } from "./common";
import type { CommonUser } from "./user";

export interface Report extends DateDTO {
  /** 신고 ID */
  id: string;
  /** 신고 제목 */
  title: string;
  /** 신고 내용 */
  content: string;
  /** 신고자 */
  user: CommonUser;
}
