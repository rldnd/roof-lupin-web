import { BasePaginationQueryParams, PagingDTO } from "@/common/types/common";
import type { Holiday, MonthHoliday } from "@/common/types/holiday";
import { apiClient } from "@/services/apiClient";

interface GetHolidaysParams {
  year: number;
  month: number;
}

interface PaginateHolidaysParams extends BasePaginationQueryParams {
  maxSize: number;
  startYear: number;
  startMonth: number;
}

/** [CLIENT] 휴일 조회하기 */
export const getHolidaysApi = (params: GetHolidaysParams) => apiClient.get<Holiday[]>("/holidays", { params });

/** [CLIENT] 휴일 조회하기 */
export const paginateHolidaysApi = (params: PaginateHolidaysParams) =>
  apiClient.get<PagingDTO<MonthHoliday>>("/holidays/paging", { params });
