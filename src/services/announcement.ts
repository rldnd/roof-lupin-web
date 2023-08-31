import type { Announcement } from "@/common/types/announcement";
import type { BasePaginationQueryParams, PagingDTO } from "@/common/types/common";
import { apiClient } from "@/services/apiClient";

/** [CLIENT] 공지사항 목록 조회 */
export const paginateAnnouncementsApi = (params: BasePaginationQueryParams) =>
  apiClient.get<PagingDTO<Announcement>>("/announcements", { params });
