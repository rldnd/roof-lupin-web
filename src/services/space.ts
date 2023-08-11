import type { BasePaginationQueryParams, PagingDTO } from "@/common/types/common";
import type { Interested } from "@/common/types/interest";
import type { Space, SpaceDetail, SpaceSort } from "@/common/types/space";
import { apiClient, fetchClient } from "@/services/apiClient";

export interface PaginateSpacesQueryParams extends BasePaginationQueryParams {
  /** 인원수 필터 */
  userCount: number | null;
  /** 카테고리 명 */
  category: string | null;
  /** 카테고리 id들 (,를 통해 구분합니다.) */
  categoryIds: string | null;
  /** 위도 */
  lat: string | null;
  /** 경도 */
  lng: string | null;
  /** 거리 - 위도 경도 검색 시 필수 */
  distance: number | null;
  /** 지역 명 */
  locationName: string | null;
  /** 예약 가능 연도 */
  year: string | null;
  /** 예약 가능 월 */
  month: string | null;
  /** 예약 가능 일 */
  day: string | null;
  /** 예약 가능 시작 시간 */
  startAt: number | null;
  /** 예약 가능 종료 시간 */
  endAt: number | null;
  /** 검색어 */
  keyword: string | null;
  /** 최소 평수 */
  minSize: number | null;
  /** 최대 평수 */
  maxSize: number | null;
  /** 서비스 id들 (,를 통해 구분합니다.) */
  serviceIds: string | null;
  /** 최소 가격 */
  minPrice: number | null;
  /** 최대 가격 */
  maxPrice: number | null;
  /** 결제 유형 */
  isImmediateReservation: boolean | null;
  sort: SpaceSort;
}

/** [SERVER ISR] 공간 상세 조회하기 */
export const getServerSpaceApi = (spaceId: string) =>
  fetchClient<SpaceDetail>(`/spaces/${spaceId}/detail`, { tags: ["spaces", `/spaces/${spaceId}/detail`] });

/** [CLIENT] 공간 상세 조회하기 */
export const getClientSpaceApi = (spaceId: string) => apiClient.get<SpaceDetail>(`/spaces/${spaceId}/detail`);

/** [CLIENT] 공간 찜 생성하기 */
export const createSpaceInterestApi = (spaceId: string) => apiClient.post(`/spaces/${spaceId}/interest`);

/** [CLIENT] 공간 찜 삭제하기 */
export const deleteSpaceInterestApi = (spaceId: string) => apiClient.delete(`/spaces/${spaceId}/interest`);

/** [CLIENT] 공간 찜 유무 조회하기 */
export const getSpaceInterestedApi = (spaceId: string) => apiClient.get<Interested>(`/spaces/${spaceId}/is-interested`);

/** [CLIENT] 공간 목록 조회하기 */
export const paginateSpacesApi = (params: Partial<PaginateSpacesQueryParams>) =>
  apiClient.get<PagingDTO<Space>>("/spaces/paging", { params });

/** [CLIENT] 공간 찜 목록 조회하기 */
export const paginateSpaceInterestsApi = (params: BasePaginationQueryParams) =>
  apiClient.get<PagingDTO<Space>>("/spaces/interest", { params });
