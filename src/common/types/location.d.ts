export interface Location {
  /** 위치 id */
  id: string;
  /** 위도 */
  lat: string;
  /** 경도 */
  lng: string;
  /** 도로명 주소 */
  roadAddress: string;
  /** 지번 주소 */
  jibunAddress: string;
}

export interface NaverAddressElement {
  types: string[];
  longName: string;
  shortName: string;
  code: string;
}

export interface NaverMeta {
  /** 검색된 총 결과 수 */
  totalCount: number;
  /** page */
  page: number;
  /** 현재 페이지 개수 */
  count: number;
}

export interface NaverAddress {
  /** 도로명 주소 */
  roadAddress: string;
  /** 지번 주소 */
  jibunAddress: string;
  /** 영문 도로명 주소 */
  englishAddress: string;
  /** 경도 (x) */
  longitude: string;
  /** 위도 (y) */
  latitude: string;
  /** 거리 */
  distance: number;
  addressElements: NaverAddressElement[];
}

export interface NaverLocation {
  /** 상태 */
  status: string;
  /** 메타데이터 */
  meta: NaverMeta;
  /** 주소 데이터 */
  addresses: NaverAddress[];
}

export interface NaverCoordinateLocation {
  /** 경도 (x) */
  longitude: string;
  /** 위도 (y) */
  latitude: string;
  /** 주소 */
  address: string | null;
}
