import { MAIN_REVALIDATE } from "@/common/constants";
import type { Main } from "@/common/types/main";
import { fetchClient } from "@/services/apiClient";

/** [ISR] 로그인 홈 화면 (배경/슬로건) 조회 */
export const getMainApi = () => fetchClient<Main>("/main", { tags: ["main", "/main"], revalidate: MAIN_REVALIDATE });
