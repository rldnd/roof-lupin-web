import type { Curation } from "@/common/types/curation";
import { apiClientLocal } from "@/services/apiClient";

/** [ISR] 홈 화면 큐레이션 목록 조회 */
export const getHomeCurationsApi = () => apiClientLocal.get<Curation[]>("/curations/home");
