import type { Holiday } from "@/common/types/holiday";
import { apiClient } from "@/services/apiClient";

interface GetHolidaysParams {
  year: string;
  month: string;
}

/** [CLIENT] 휴일 조회하기 */
export const getHolidaysApi = (params: GetHolidaysParams) => apiClient.get<Holiday>("/holidays", { params });
