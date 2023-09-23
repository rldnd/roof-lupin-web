export interface ServiceIcon {
  /** 서비스 아이디 */
  serviceId: string;
  /** 아이콘 아이디 */
  iconId: string;
  /** 아이콘 */
  iconPath: string;
  /** 선택용 여부 */
  isSelected: boolean;
}

export interface Service {
  /** 시설 id */
  id: string;
  /** 시설 아이콘 경로 */
  icons: ServiceIcon[];
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
  /** 추가 서비스 설명 */
  description: string | null;
  /** 추가 서비스 툴팁 */
  tooltip: string | null;
  /** 추가 서비스 최대 개수 */
  maxCount: number | null;
  /** 대여 상품 id */
  rentalTypeId: string;
}

export interface AdditionalServiceReservation {
  /** 추가 서비스 ID */
  id: string;
  /** 추가 서비스 개수 */
  count: number;
}

export interface ServiceTitle {
  /** id */
  id: string;
  /** 이름 */
  name: string;
  /** 서비스 리스트 */
  services: Service[];
}

export interface ReservationAdditionalService extends AdditionalService {
  /** 추가 서비스 개수 */
  count: number;
}
