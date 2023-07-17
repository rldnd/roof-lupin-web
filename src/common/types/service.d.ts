export interface Service {
  /** 시설 id */
  id: string;
  /** 시설 아이콘 경로 */
  iconPath: string;
  /** 시설 이름 */
  name: string;
}

export interface AdditionalService {
  /** 추가 서비스 id */
  id: string;
  /** 추가 서비스 이름 */
  name: string;
  /** 추가 서비스 가격 */
  cost: number;
}

export interface AdditionalServiceReservation {
  /** 추가 서비스 ID */
  id: string;
  /** 추가 서비스 개수 */
  count: number;
}
