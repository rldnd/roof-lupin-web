import type { Category } from "@/common/types/category";
import type { Curation } from "@/common/types/curation";
import type { HomeContent } from "@/common/types/home";
import { apiClient, fetchClient } from "@/services/apiClient";

/** [SERVER ISR] 홈 화면 큐레이션 목록 조회 */
export const getHomeCurationsApi = () =>
  fetchClient<Curation[]>("/home/curations", { tags: ["home", "/home/curations"] });

/** [SERVER ISR] 홈 카테고리 리스트 조회 */
export const getHomeCategoriesApi = () =>
  fetchClient<Category[]>(`/home/categories`, { tags: ["home", "/home/categories"] });

/** [SERVER ISR] 홈 화면 컨텐츠를 가져옵니다 */
export const getHomeContentsApi = () =>
  fetchClient<HomeContent[]>("/home/contents", { tags: ["home", "/home/contents"] });

/** [CLIENT] 홈 화면 컨텐츠를 가져와 spaces만을 가져옵니다. */
export const getHomeSpacesInContentsApi = () => apiClient.get<HomeContent[]>("/home/contents");
