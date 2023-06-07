import type { DateDTO } from "./common";
import type { Host } from "./host";
import type { CommonUser } from "./user";

export interface QnAAnswer extends DateDTO {
  /** 답변 ID */
  id: string;
  /** 답변 내용 */
  content: string;
  /** qna ID */
  qnaId: string;
  /** 호스트 */
  host: Host;
}

export interface QnA extends DateDTO {
  /** QnA ID */
  id: string;
  /** 내용 */
  content: string;
  /** 유저 */
  user: CommonUser;
  /** 답변 */
  answers: QnAAnswer[];
}
