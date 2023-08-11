import type { LocationFilter, NaverAddress, NaverCoordinateLocation } from "@/common/types/location";
import { apiClient } from "@/services/apiClient";

/** [CLIENT] 네이버 지도 API를 이용하여 좌표를 주소로 변환합니다. */
export const getLocationCoordinateApi = (params: Pick<NaverAddress, "latitude" | "longitude">) =>
  apiClient.get<NaverCoordinateLocation>("/locations/naver/coordinate", { params });

/** [CLIENT] 위치 필터 조회 */
export const getLocationFiltersApi = () => apiClient.get<LocationFilter[]>("/location-filters");
