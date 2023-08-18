import { apiClient } from "@/services/apiClient";

interface CreateReviewReportBody {
  content: string;
  reviewId: string;
}

export const createReviewReportApi = (body: CreateReviewReportBody) =>
  apiClient.post<{ id: string }>("/reports/reviews", body);
