import type { DateDTO, ImageDTO } from "./common";
import type { Host } from "./host";
import type { Location } from "./location";
import type { ReservationRentalType } from "./reservation";
import type { SpaceCategory, Transportation } from "./space";
import type { CommonUser } from "./user";

import { REVIEW_SORT } from "../constants/review";

export type ReviewSort = (typeof REVIEW_SORT)[number];

export interface ReviewSpace {
  /** 공간 id */
  id: string;
  /** 공간 제목 */
  title: string;
  /** 공간 평점 */
  averageScore: number;
  /** 공간 리뷰 개수 */
  reviewCount: number;
  /** 공간 신고 개수 */
  reportCount: number;
  /** 공간 시간 최소 가격 */
  timeCost: number | null;
  /** 공간 패키지 최소 가격 */
  packageCost: number | null;
  /** 찜 여부 */
  isInterested: boolean;
  /** 노출 여부 */
  isPublic: boolean;
  /** 승인 여부 */
  isApproved: boolean;
  /** 찜 개수 */
  interestCount: number;
  /** 즉각 예약 여부 */
  isImmediateReservation: boolean;
  /** 공간 썸네일 */
  thumbnail: string;
  /** 호스트 id */
  hostId: string;
  /** 공간 대중 교통 */
  publicTransportations: Transportation[];
  /** 공간 위치 */
  location: Location | null;
  /** 공간 순서 */
  orderNo: number | null;
  /** 공간이 속한 카테고리 */
  categories: SpaceCategory[];
}

export interface Review extends DateDTO {
  id: string;
  content: string;
  score: number;
  images: ImageDTO[];
  isBest: boolean;
  user: CommonUser;
  /** 예약 id */
  reservationId: string;
  answer: ReviewAnswer | null;
  /** 수정 가능 여부 */
  isEditable: boolean;
  /** 공간 정보 */
  space: ReviewSpace;
  /** 예약 타입 정보 */
  reservationRentalTypes: ReservationRentalType[];
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

export interface ReviewCount {
  /** 리뷰 갯수 */
  count: number;
}

export interface CreateReview {
  /** 리뷰 내용 */
  content: string;
  /** 이미지 url */
  images: string[];
  /** 별점 */
  score: number;
  /** 공간 아이디 */
  spaceId: string;
  /** 예약 아이디 */
  reservationId: string;
}
