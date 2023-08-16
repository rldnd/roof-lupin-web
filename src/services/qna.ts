import type { BasePaginationQueryParams, PagingDTO } from "@/common/types/common";
import type { QnA } from "@/common/types/qna";
import { apiClient } from "@/services/apiClient";

export interface PaginateQnasParams extends BasePaginationQueryParams {
  spaceId: string;
}

/** [CLIENT] 공간 Q&A 조회 */
export const paginateSpaceQnasApi = ({ spaceId, ...params }: PaginateQnasParams) =>
  apiClient.get<PagingDTO<QnA>>(`/qnas/${spaceId}/paging`, { params });
