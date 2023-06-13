import { apiClient } from "@/services/apiClient";

/** [CLIENT] 공간 찜 생성하기 */
export const createSpaceInterestApi = (spaceId: string) => apiClient.post(`/spaces/${spaceId}/interest`);
/** [CLIENT] 공간 찜 삭제하기 */
export const deleteSpaceInterestApi = (spaceId: string) => apiClient.delete(`/spaces/${spaceId}/interest`);
