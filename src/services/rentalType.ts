import type { BasePaginationQueryParams, PagingDTO } from "@/common/types/common";
import type { PossibleRentalTypes, PossibleRentalTypesByMonth, RentalType } from "@/common/types/rentalType";
import type { SpaceRentalType } from "@/common/types/space";
import { apiClient, fetchClient } from "@/services/apiClient";

export interface PaginateSpaceRentalTypePossibleMonthParams extends BasePaginationQueryParams {
  spaceId: string;
  maxSize: number;
  startYear: number;
  startMonth: number;
}

export interface GetSpaceRentalTypePossibleParams {
  spaceId: string;
  year: number;
  month: number;
  day: number;
}

export interface GetSpaceRentalTypeParams {
  spaceId: string;
  year?: number;
  month?: number;
  day?: number;
}

/** [CLIENT] 공간 대여 타입 조회하기 */
export const getSpaceRentalTypeApi = ({ spaceId, ...params }: GetSpaceRentalTypeParams) =>
  apiClient.get<RentalType[]>(`/rental-types/${spaceId}`, { params });

/** [SERVER ISR] 공간 대여 타입 상세 조회하기 */
export const getSpaceRentalTypeDetailApi = (spaceId: string) =>
  fetchClient<SpaceRentalType>(`/rental-types/${spaceId}/detail`, {
    tags: ["rental-types", `/rental-types/${spaceId}/detail`],
  });

/** [CLIENT] 공간 및 날짜별 가능한 대여 타입 조회하기 */
export const paginateSpaceRentalTypePossibleMonthApi = ({
  spaceId,
  ...params
}: PaginateSpaceRentalTypePossibleMonthParams) =>
  apiClient.get<PagingDTO<PossibleRentalTypesByMonth>>(`/rental-types/${spaceId}/possible/month/paging`, { params });

/** [CLIENT] 공간 및 날짜별 가능한 대여 타입 조회하기 */
export const getSpaceRentalTypePossibleApi = ({ spaceId, ...params }: GetSpaceRentalTypePossibleParams) =>
  apiClient.get<PossibleRentalTypes>(`/rental-types/${spaceId}/possible`, { params });
