import type { CurationDetail } from "@/common/types/curation";
import { fetchClient } from "@/services/apiClient";

/** [SERVER ISR] 큐레이션 상세 조회 */
export const getCurationApi = (curationId: string) =>
  fetchClient<CurationDetail>(`/curations/${curationId}/detail`, {
    tags: ["curations", `/curations/${curationId}/detail`],
  });
