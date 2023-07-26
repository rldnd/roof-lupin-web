import type { BasePaginationQueryParams, PagingDTO } from "@/common/types/common";
import type { Ranking } from "@/common/types/ranking";
import type { Space } from "@/common/types/space";
import { apiClient, fetchClient } from "@/services/apiClient";

export interface PaginateRankingSpacesParams extends BasePaginationQueryParams {
  rankingId: string;
}

/** [SERVER ISR] 랭킹 아이디 조회 */
export const getRankingIdsApi = () => fetchClient<string[]>("/rankings/ids", { tags: ["rankings", "/rankings/ids"] });

/** [SERVER ISR] 랭킹 자세히 불러오기 */
export const getRankingApi = (rankingId: string) =>
  fetchClient<Ranking>(`/rankings/${rankingId}/detail`, { tags: ["rankings", `/rankings/${rankingId}/detail`] });

/** [CLIENT] 랭킹 공간 페이징 조회 */
export const paginateRankingSpacesApi = ({ rankingId, ...params }: PaginateRankingSpacesParams) =>
  apiClient.get<PagingDTO<Space>>(`/rankings/${rankingId}/spaces/paging`, { params });
