import type { ContentCategory } from "@/common/types/content";
import { fetchClient } from "@/services/apiClient";

/** [SERVER ISR] 콘텐츠 단일 조회 */
export const getContentApi = (contentId: string) =>
  fetchClient<ContentCategory>(`/contents/${contentId}/detail`, {
    tags: ["contents", `/contents/${contentId}/detail`],
  });
