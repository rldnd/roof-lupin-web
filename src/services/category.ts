import type { Category } from "@/common/types/category";
import { apiClientLocal } from "@/services/apiClient";

/** [ISR] 홈 카테고리 리스트 조회 */
export const getHomeCategoriesApi = () => apiClientLocal.get<Category[]>(`/categories/home`);
