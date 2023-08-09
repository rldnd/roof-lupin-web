import type { ServiceTitle } from "@/common/types/service";
import { apiClient } from "@/services/apiClient";

/** [CLIENT] 서비스 타이틀 리스트 조회 - 필터에 사용 */
export const getServiceTitlesApi = () => apiClient.get<ServiceTitle[]>("/services/titles");
