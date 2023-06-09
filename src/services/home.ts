import type { Home } from "@/common/types/home";
import { apiClientLocal } from "@/services/apiClient";

/** [ISR] 로그인 홈 화면 (배경/슬로건) 조회 */
export const getHomeApi = () => apiClientLocal.get<Home>("/home");
