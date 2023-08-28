import type { DateDTO } from "./common";
import type { Host } from "./host";
import type { Space } from "./space";
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

export interface QnA extends Omit<DateDTO, "deletedAt"> {
  /** QnA ID */
  id: string;
  /** 내용 */
  content: string;
  /** 유저 */
  user: CommonUser;
  /** 답변 */
  answer: QnAAnswer | null;
  /** 공간 */
  space: Space;
}
