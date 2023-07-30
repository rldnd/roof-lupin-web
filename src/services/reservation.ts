import type { CreateReservation } from "@/common/types/reservation";
import { apiClient } from "@/services/apiClient";

export const prepareReservationApi = (body: CreateReservation) =>
  apiClient.post<{ id: string }>("/reservation/prepare", body);
