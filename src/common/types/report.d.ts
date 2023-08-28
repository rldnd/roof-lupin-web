import type { Admin } from "./admin";
import type { DateDTO } from "./common";
import type { QnA } from "./qna";
import type { Review } from "./review";
import type { Space } from "./space";
import type { CommonUser } from "./user";

import { REPORT_STATUS_MAPPER } from "../constants/report";

export type ReportStatus = keyof typeof REPORT_STATUS_MAPPER;

export interface ReportAnswer extends Omit<DateDTO, "updatedAt"> {
  /** 신고 답변 id */
  id: string;
  /** 신고 답변 내용 */
  content: string;
  /** 신고 답변 관리자 */
  admin: Admin;
}

export interface Report extends Omit<DateDTO, "updatedAt"> {
  /** 신고 ID */
  id: string;
  /** 신고 상태 */
  reportStatus: ReportStatus;
  /** 신고 내용 */
  content: string;
  /** 공간 정보 */
  space: Space | null;
  /** 공간 리뷰 정보 */
  spaceReview: Review | null;
  /** 공간 QnA 정보 */
  spaceQna: QnA | null;
  /** 신고자 */
  user: CommonUser | null;
  /** 신고 답변 */
  answer: Admin;
}
