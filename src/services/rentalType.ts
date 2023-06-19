import { SpaceRentalType } from "@/common/types/space";
import { fetchClient } from "@/services/apiClient";

/** [SERVER ISR] 공간 대여 타입 상세 조회하기 */
export const getSpaceRentalTypeDetailApi = async (spaceId: string) =>
  fetchClient<SpaceRentalType>(`/rental-types/${spaceId}/detail`, {
    tags: ["rental-types", `/rental-types/${spaceId}/detail`],
  });
