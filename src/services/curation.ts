import type { Curation } from "@/common/types/curation";
import { fetchClient } from "@/services/apiClient";

/** [ISR] 홈 화면 큐레이션 목록 조회 */
export const getHomeCurationsApi = () =>
  fetchClient<Curation[]>("/curations/home", { tags: ["home", "curations", "/curations/home"] });
