import type { BasePaginationQueryParams, PagingDTO } from "@/common/types/common";
import type { Review, ReviewCount, ReviewSort, ReviewSummary } from "@/common/types/review";
import { apiClient } from "@/services/apiClient";

export interface PaginateReviewsParams extends BasePaginationQueryParams {
  spaceId: string;
  sort: ReviewSort;
  hasPhoto: boolean;
}

/** [CLIENT] 공간의 리뷰 요약을 불러옵니다. */
export const getReviewsSummaryApi = (spaceId: string) => apiClient.get<ReviewSummary>(`/reviews/${spaceId}/summary`);

/** [CLIENT] 공간의 리뷰 목록을 불러옵니다. */
export const paginateReviewsApi = ({ spaceId, ...params }: PaginateReviewsParams) =>
  apiClient.get<PagingDTO<Review>>(`/reviews/${spaceId}/paging`, { params });

/** [CLIENT] 리뷰 자세히 불러오기 */
export const getReviewApi = (reviewId: string) => apiClient.get<Review>(`/reviews/${reviewId}/detail`);

/** [CLIENT] 내가 작성한 리뷰 개수를 불러옵니다. */
export const getMyReviewsCountApi = () => apiClient.get<ReviewCount>("/reviews/count");
