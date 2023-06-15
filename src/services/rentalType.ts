import type { RentalType } from "@/common/types/rentalType";
import { SpaceRentalType } from "@/common/types/space";
import { fetchClient } from "@/services/apiClient";

/** [SERVER ISR] 공간 대여 타입 조회하기 */
export const getSpaceRentalTypesApi = (spaceId: string) =>
  fetchClient<RentalType[]>(`/rental-types/${spaceId}`, {
    tags: ["rental-types", `/rental-types/${spaceId}`],
  });

export const getSpaceRentalTypes = async (spaceId: string) =>
  fetchClient<SpaceRentalType>(`/rental-types/${spaceId}/detail`, {
    tags: ["rental-types", `/rental-types/${spaceId}/detail`],
  });
