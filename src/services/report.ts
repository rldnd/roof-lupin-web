import { apiClient } from "@/services/apiClient";

interface CreateReviewReportBody {
  content: string;
  reviewId: string;
}

interface CreateQnaReportBody {
  content: string;
  qnaId: string;
}

interface CreateSpaceReportBody {
  content: string;
  spaceId: string;
}

export const createReviewReportApi = (body: CreateReviewReportBody) =>
  apiClient.post<{ id: string }>("/reports/reviews", body);

export const createQnaReportApi = (body: CreateQnaReportBody) => apiClient.post<{ id: string }>(`/reports/qnas`, body);

export const createSpaceReportApi = (body: CreateSpaceReportBody) =>
  apiClient.post<{ id: string }>("/reports/spaces", body);
