import type { PagingDTO } from "@/common/types/common";
import type { Review, ReviewSort } from "@/common/types/review";
import { apiClient } from "@/services/apiClient";

export interface PaginateReviewsParams {
  spaceId: string;
  page: number;
  limit: number;
  sort: ReviewSort;
  hasPhoto: boolean | null;
}

/** [CLIENT] 공간의 리뷰 목록을 불러옵니다. */
export const paginateReviewsApi = ({ spaceId, ...params }: PaginateReviewsParams) =>
  apiClient.get<PagingDTO<Review>>(`/reviews/${spaceId}/paging`, { params });
