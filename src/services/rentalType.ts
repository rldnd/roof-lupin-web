import { SpaceRentalType } from "@/common/types/space";
import { fetchClient } from "@/services/apiClient";

export const getSpaceRentalTypeDetailApi = async (spaceId: string) =>
  fetchClient<SpaceRentalType>(`/rental-types/${spaceId}/detail`, {
    tags: ["rental-types", `/rental-types/${spaceId}/detail`],
  });
