import type { Building } from "./building";
import type { CategoryIcon } from "./category";
import type { Caution } from "./caution";
import type { Day, ImageDTO } from "./common";
import type { Host } from "./host";
import type { Location } from "./location";
import type { OpenHour } from "./openHour";
import type { RefundPolicy } from "./refund";
import type { PackageRentalType, TimeRentalType } from "./rentalType";
import type { Review } from "./review";
import type { Service } from "./service";
import type { Size } from "./size";

import { SPACE_SORT } from "../constants/space";

export type SpaceSort = (typeof SPACE_SORT)[number];

export interface Transportation {
  /** id */
  id: string;
  /** 역/정류장 이름 */
  name: string;
  /** 걸리는 시간(분) */
  timeTaken: number;
}

export interface SpaceCategory {
  /** 카테고리 id */
  id: string;
  /** 카테고리 이름 */
  name: string;
  /** 아이콘 이미지 경로 */
  icons: CategoryIcon[];
}

export interface SpaceHoliday {
  /** 휴무일 id */
  id: string;
  /** 요일 */
  day: Day;
  /** 간격 (해당 월의 n번째주) */
  interval: number;
}

export interface BestPhoto {
  id: string;
  url: string;
}

export interface Space {
  /** 공간 id */
  id: string;
  /** 공간 제목 */
  title: string;
  /** 공간 평점 */
  averageScore: number;
  /** 공간 리뷰 개수 */
  reviewCount: number;
  /** 공간 시간 최소 가격 */
  timeCost: number | null;
  /** 공간 패키지 최소 가격 */
  packageCost: number | null;
  /** 찜 여부 */
  isInterested: boolean;
  /** 즉각 예약 여부 */
  isImmediateReservation: boolean;
  /** 공간 썸네일 */
  thumbnail: string;
  /** 대중교통 목록 */
  publicTransportations: Transportation[];
  /** 공간 위치 */
  location: Location | null;
  /** 공간이 속한 카테고리 */
  categories: SpaceCategory[];
  /** 공간 순서 */
  orderNo: number | null;
  /** 초과 사용자 비용 */
  overflowUserCost: number;
  /** 초과 사용자 수 */
  overflowUserCount: number;
  /** 환불 정책 목록 */
  refundPolicies: RefundPolicy[];
}

export interface SpaceDetail extends Omit<Space, "isBest" | "isInterested" | "timeCost" | "packageCost"> {
  /** 보증금 */
  deposit: number | null;
  /** 공간 베스트 여부 */
  isBest: boolean;
  /** 찜 여부 */
  isInterested: boolean;
  /** 공간 설명 */
  description: string;
  /** 공간 최소 크기 */
  minSize: number;
  /** 건물 타입 */
  buildingType: number | null;
  /** 공간 최소 인원 */
  minUser: number;
  /** 공간 최대 인원 */
  maxUser: number;
  /** 공간 Q&A 개수 */
  qnaCount: number;
  /** 호스트 정보 */
  host: Host;
  /** 공간 이미지 목록 */
  images: ImageDTO[];
  /** 주의 사항 목록 */
  cautions: Caution[];
  /** 리뷰 목록 */
  reviews: Review[];
  /** 시설 목록 */
  buildings: Building[];
  /** 서비스 목록 */
  services: Service[];
  /** 공간 크기 목록 */
  sizes: Size[];
  /** 베스트 포토 */
  bestPhotos: BestPhoto[];
  /** 영업 시간 */
  openHours: OpenHour[];
  /** 휴일 */
  holidays: SpaceHoliday[];
}

export interface SpaceRentalType {
  /** 시간 대여타입 */
  timeRentalType: TimeRentalType | null;
  /** 패키지 대여타입 */
  packageRentalType: PackageRentalType | null;
}
