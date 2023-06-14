import { SpaceRentalType } from "@/common/types/space";
import { fetchClient } from "@/services/apiClient";

/** [SERVER ISR] */
export const getSpaceRentalTypeApi = (spaceId: string) =>
  fetchClient<SpaceRentalType>(`/rental-types/${spaceId}/detail`, {
    tags: ["rental-types", `/rental-types/${spaceId}/detail`],
  });
