import type { BasePaginationQueryParams, PagingDTO } from "@/common/types/common";
import type { Interested } from "@/common/types/interest";
import type { Space, SpaceDetail, SpaceSort } from "@/common/types/space";
import { apiClient, fetchClient } from "@/services/apiClient";

export interface PaginateSpacesQueryParams extends BasePaginationQueryParams {
  userCount: number | null;
  category: string | null;
  lat: string | null;
  lng: string | null;
  distance: number | null;
  locationName: string | null;
  year: string | null;
  month: string | null;
  day: string | null;
  time: number | null;
  sort: SpaceSort;
}

/** [SERVER ISR] 공간 아이디 목록 조회하기 */
export const getSpaceIdsApi = () => fetchClient<{ ids: string[] }>("/spaces/ids", { tags: ["spaces", "/spaces/ids"] });
/** [SERVER ISR] 공간 상세 조회하기 */
export const getSpaceApi = (spaceId: string) =>
  fetchClient<SpaceDetail>(`/spaces/${spaceId}/detail`, { tags: ["spaces", `/spaces/${spaceId}/detail`] });
/** [CLIENT] 공간 찜 생성하기 */
export const createSpaceInterestApi = (spaceId: string) => apiClient.post(`/spaces/${spaceId}/interest`);
/** [CLIENT] 공간 찜 삭제하기 */
export const deleteSpaceInterestApi = (spaceId: string) => apiClient.delete(`/spaces/${spaceId}/interest`);
/** [CLIENT] 공간 찜 유무 조회하기 */
export const getSpaceInterestedApi = (spaceId: string) => apiClient.get<Interested>(`/spaces/${spaceId}/is-interested`);
/** [CLIENT] 공간 목록 조회하기 */
export const paginateSpacesApi = (params: PaginateSpacesQueryParams) =>
  apiClient.get<PagingDTO<Space>>("/spaces/paging", { params });
