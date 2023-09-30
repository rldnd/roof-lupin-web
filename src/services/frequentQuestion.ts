import type { FrequentQuestion } from "@/common/types/frequentQuestion";
import { apiClient } from "@/services/apiClient";

export const getFrequentQuestionsApi = () => apiClient.get<FrequentQuestion[]>("/frequent-questions");
