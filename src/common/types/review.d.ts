import type { DateDTO, ImageDTO } from "./common";
import type { Host } from "./host";
import type { CommonUser } from "./user";

export type ReviewSort = "CREATED_AT" | "SCORE_HIGH" | "SCORE_LOW";

export interface Review extends DateDTO {
  id: string;
  content: string;
  score: number;
  images: ImageDTO[];
  isBest: boolean;
  user: CommonUser;
  reviewAnswers: ReviewAnswer[];
}

export interface ReviewAnswer {
  /** 답변 아이디 */
  id: string;
  /** 답변 내용 */
  content: string;
  /** 생성 일자 */
  createdAt: Date;
  /** 답변자 */
  host: Host;
}

export interface ReviewSummary {
  /** 평균 점수 */
  averageScore: number;
  /** 리뷰 개수 */
  count: number;
}
