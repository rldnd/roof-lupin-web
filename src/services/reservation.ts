import type { CreateReservation, ReservationDetail } from "@/common/types/reservation";
import { apiClient } from "@/services/apiClient";

/** [CLIENT] 내 예약 상세 조회 */
export const getMyReservationApi = (reservationId: string) =>
  apiClient.get<ReservationDetail>(`/reservations/${reservationId}/me`);

export const prepareReservationApi = (body: CreateReservation) =>
  apiClient.post<{ id: string }>("/reservations/prepare", body);
