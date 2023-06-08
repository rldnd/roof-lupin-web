export interface TimeCostInfo {
  /** 시간별 가격 id */
  id: string;
  /** 시간별 가격 */
  cost: number;
  /** 시작 시간 */
  startAt: number;
  /** 종료 시간 */
  endAt: number;
}

export interface RentalType {
  /** 대여타입 시간 */
  id: string;
  /** 대여타입 이름 */
  name: string;
  /** 기본 가격 */
  baseCost: number;
  /** 대여타입, 시간 | 패키지 */
  rentalType: number;
  /** 기본 시간 */
  baseHour: number | null;
  /** 시작 시간 */
  startAt: number;
  /** 종료 시간 */
  endAt: number;
  /** 시간별 가격 */
  timeCostInfos: TimeCostInfo[];
}

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
  /** 상세 요금 (더보기) */
  rentalTypes: RentalType[];
}
