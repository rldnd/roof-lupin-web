import { Review } from "@/common/types/review";
import { fetchClient } from "@/services/apiClient";

/** [SERVER ISR] 공간의 베스트 리뷰 목록을 불러옵니다 */
export const getBestReviewsApi = (spaceId: string) =>
  fetchClient<Review[]>(`/reviews/${spaceId}/best`, { tags: ["reviews", `/reviews/${spaceId}/best`] });
