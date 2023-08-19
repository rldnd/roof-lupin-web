import type { Host } from "@/common/types/host";
import { fetchClient } from "@/services/apiClient";

/** [SERVER ISR] 공간 id로 호스트 조회하기 */
export const getSpaceHostApi = (spaceId: string) =>
  fetchClient<Host>(`/hosts/spaces/${spaceId}`, { tags: ["hosts", `/hosts/spaces/${spaceId}`] });
