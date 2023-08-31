import type { BasePaginationQueryParams, PagingDTO } from "@/common/types/common";
import type { QnA } from "@/common/types/qna";
import { apiClient } from "@/services/apiClient";

export interface PaginateQnasParams extends BasePaginationQueryParams {
  spaceId: string;
}

export interface PaginateMyQnasParams extends BasePaginationQueryParams {
  isAnswered: boolean;
}

export interface CreateSpaceQnaBody {
  content: string;
  spaceId: string;
}

/** [CLIENT] 공간 Q&A 조회 */
export const paginateSpaceQnasApi = ({ spaceId, ...params }: PaginateQnasParams) =>
  apiClient.get<PagingDTO<QnA>>(`/qnas/${spaceId}/paging`, { params });

/** [CLIENT] 내 Q&A 조회 */
export const paginateMyQnasApi = (params: PaginateMyQnasParams) =>
  apiClient.get<PagingDTO<QnA>>("/qnas/me/paging", { params });

export const createSpaceQnaApi = (body: CreateSpaceQnaBody) => apiClient.post<{ id: string }>("/qnas", body);
