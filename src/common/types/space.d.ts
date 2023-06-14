import type { Caution } from "./caution";
import type { ImageDTO } from "./common";
import type { Facility } from "./facility";
import type { Hashtag } from "./hashtag";
import type { Host } from "./host";
import type { Location } from "./location";
import type { RefundPolicy } from "./refund";
import type { PackageRentalType, TimeRentalType } from "./rentalType";
import type { Review } from "./review";
import type { Service } from "./service";

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
  /** 공간 베스트 여부 */
  isBest: boolean;
  /** 찜 여부 */
  isInterested: boolean;
  /** 공간 썸네일 */
  thumbnail: string;
  /** 공간 대중 교통 */
  publicTransportation: Transportation | null;
  /** 공간 위치 */
  location: Location | null;
}

export interface SpaceDetail
  extends Omit<Space, "publicTransportation" | "isBest" | "isInterested" | "timeCost" | "packageCost"> {
  /** 공간 베스트 여부 */
  isBest: boolean;
  /** 찜 여부 */
  isInterested: boolean;
  /** 공간 설명 */
  description: string;
  /** 공간 최소 크기 */
  minSize: number;
  /** 공간 타입 */
  spaceType: number | null;
  /** 건물 타입 */
  buildingType: number | null;
  /** 공간 최소 인원 */
  minUser: number;
  /** 공간 최대 인원 */
  maxUser: number;
  /** 초가 인원 당 추가 금액 */
  overflowUserCost: number;
  /** 초과 인원 */
  overflowUserCount: number;
  /** 호스트 정보 */
  host: Host;
  /** 리뷰 목록 */
  reviews: Review[];
  /** 공간 이미지 목록 */
  images: ImageDTO[];
  /** 환불 정책 목록 */
  refundPolicies: RefundPolicy[];
  /** 주의 사항 목록 */
  cautions: Caution[];
  /** 시설 목록 */
  facilities: Facility[];
  /** 서비스 목록 */
  services: Service[];
  /** 공간 카테고리 목록 */
  categories: SpaceCategory[];
  /** 해시태그 목록 */
  hashtags: Hashtag[];
  /** 대중교통 목록 */
  publicTransportations: Transportation[];
}

export interface SpaceRentalType {
  /** 시간 대여타입 */
  timeRentalTypes: TimeRentalType | null;
  /** 패키지 대여타입 */
  packageRentalType: PackageRentalType | null;
}
