import type { Category } from "@/common/types/category";
import { fetchClient } from "@/services/apiClient";

/** [ISR] 홈 카테고리 리스트 조회 */
export const getHomeCategoriesApi = () =>
  fetchClient<Category[]>(`/categories/home`, { tags: ["home", "categories", "/categories/home"] });
