import type { PossibleRentalTypes } from "@/common/types/rentalType";
import type { SpaceRentalType } from "@/common/types/space";
import { apiClient, fetchClient } from "@/services/apiClient";

export interface GetSpaceRentalTypePossibleMonthParams {
  spaceId: string;
  year: string;
  month: string;
}

export interface GetSpaceRentalTypePossibleParams extends GetSpaceRentalTypePossibleMonthParams {
  day: string;
}

/** [SERVER ISR] 공간 대여 타입 상세 조회하기 */
export const getSpaceRentalTypeDetailApi = (spaceId: string) =>
  fetchClient<SpaceRentalType>(`/rental-types/${spaceId}/detail`, {
    tags: ["rental-types", `/rental-types/${spaceId}/detail`],
  });

/** [CLIENT] 공간 및 날짜별 가능한 대여 타입 조회하기 */
export const getSpaceRentalTypePossibleMonthApi = ({ spaceId, ...params }: GetSpaceRentalTypePossibleMonthParams) =>
  apiClient.get<PossibleRentalTypes>(`/rental-types/${spaceId}/possible/month`, { params });

/** [CLIENT] 공간 및 날짜별 가능한 대여 타입 조회하기 */
export const getSpaceRentalTypePossibleApi = ({ spaceId, ...params }: GetSpaceRentalTypePossibleParams) =>
  apiClient.get<PossibleRentalTypes>(`/rental-types/${spaceId}/possible`, { params });
