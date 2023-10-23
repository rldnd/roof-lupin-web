import type { ExhibitionDetail } from "@/common/types/exhibition";
import { fetchClient } from "@/services/apiClient";

/** [SERVER ISR] 기획전 상세 조회 */
export const getExhibitionApi = (exhibitionId: string) =>
  fetchClient<ExhibitionDetail>(`/exhibitions/${exhibitionId}/detail`, {
    tags: ["exhibitions", `/exhibitions/${exhibitionId}/detail`],
  });
