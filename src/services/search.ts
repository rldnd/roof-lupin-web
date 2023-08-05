import type { SearchRecommend, SearchRecord } from "@/common/types/search";
import type { Space } from "@/common/types/space";

import { apiClient } from "./apiClient";

/** [CLIENT] 최근 검색어 조회 */
export const getSearchRecordsApi = () => apiClient.get<SearchRecord[]>("/search/records");
/** [CLIENT] 인기 검색어 조회 */
export const getSearchRecommendsApi = () => apiClient.get<SearchRecommend[]>("/search/recommends");
/** [CLIENT] 최근 검색한 공간 조회 */
export const getSearchRecentSpacesApi = () => apiClient.get<Space[]>("/search/recent/spaces");
export const deleteSearchRecordApi = (searchRecordId: string) => apiClient.delete(`/search/records/${searchRecordId}`);
