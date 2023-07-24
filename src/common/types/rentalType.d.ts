import type { Day } from "./common";
import type { AdditionalService } from "./service";

export interface TimeCostInfo {
  /** 시간별 가격 */
  cost: number;
  /** 시작 시간 */
  time: number;
}

export interface BaseTimeRentalType {
  /** 대여타입 시간 */
  id: string;
  /** 대여타입 이름 */
  name: string;
  /** 기본 가격 */
  baseCost: number;
  /** 대여타입 */
  rentalType: "TIME";
  /** 기본 시간 */
  baseHour: number | null;
  /** 시작 시간 */
  startAt: number;
  /** 종료 시간 */
  endAt: number;
  /** 시간별 가격 */
  timeCostInfos: TimeCostInfo[];
  /** 공간 ID */
  spaceId: string;
}

export interface BasePackageRentalType {
  /** 대여타입 시간 */
  id: string;
  /** 대여타입 이름 */
  name: string;
  /** 기본 가격 */
  baseCost: number;
  /** 대여타입 */
  rentalType: "PACKAGE";
  /** 시작 시간 */
  startAt: number;
  /** 종료 시간 */
  endAt: number;
  /** 공간 ID */
  spaceId: string;
}

export type RentalType = BaseTimeRentalType | BasePackageRentalType;

export interface TimeRentalType {
  /** 렌탈타입 ID */
  id: string;
  /** 렌탈 타입 이름 */
  name: string;
  /** 최소가 */
  minCost: number;
  /** 최대가 */
  maxCost: number;
}

export interface PackageRentalType {
  /** 최소가격 */
  minPrice: number;
  /** 최대가격 */
  maxPrice: number;
  /** 상세 요금 (더보기) */
  rentalTypes: RentalType[];
}

export interface PossibleTimeCostInfo extends TimeCostInfo {
  isPossible: boolean;
}

export interface PossibleTime extends Omit<BaseTimeRentalType, "timeCostInfos"> {
  day: Day;
  timeCostInfos: PossibleTimeCostInfo[];
  additionalServices: AdditionalService[];
}

export interface PossiblePackage extends BasePackageRentalType {
  /** 기본 시간 */
  baseHour: number | null;
  day: Day;
  isPossible: boolean;
  additionalServices: AdditionalService[];
}

export interface PossibleRentalTypes {
  /** 시간대여타입 */
  time: PossibleTime | null;
  /** 패키지대여타입 */
  package: PossiblePackage[];
}

export interface PossibleRentalTypeByMonth {
  day: string;
  isHoliday: boolean;
  isPossible: boolean;
  rentalTypes: PossibleRentalTypes;
}

export interface PossibleRentalTypesByMonth {
  year: string;
  month: string;
  days: PossibleRentalTypesByMonth[];
}
