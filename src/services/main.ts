import type { Main } from "@/common/types/main";
import { apiClientLocal } from "@/services/apiClient";

/** [ISR] 로그인 홈 화면 (배경/슬로건) 조회 */
export const getMainApi = () => apiClientLocal.get<Main>("/main");
