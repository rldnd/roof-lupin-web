import type { Interested } from "@/common/types/interest";
import type { SpaceDetail } from "@/common/types/space";
import { apiClient, fetchClient } from "@/services/apiClient";

/** [SERVER ISR] 공간 상세 조회하기 */
export const getSpaceApi = (spaceId: string) =>
  fetchClient<SpaceDetail>(`/spaces/${spaceId}/detail`, { tags: ["spaces", `/spaces/${spaceId}/detail`] });
/** [CLIENT] 공간 찜 생성하기 */
export const createSpaceInterestApi = (spaceId: string) => apiClient.post(`/spaces/${spaceId}/interest`);
/** [CLIENT] 공간 찜 삭제하기 */
export const deleteSpaceInterestApi = (spaceId: string) => apiClient.delete(`/spaces/${spaceId}/interest`);
/** [CLIENT] 공간 찜 유무 조회하기 */
export const getSpaceInterestedApi = (spaceId: string) =>
  apiClient.get<Interested>(`/spaces/${spaceId}/is-interested`).then((res) => res.data);
