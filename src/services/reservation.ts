import type { CreateReservation, Reservation, ReservationDetail } from "@/common/types/reservation";
import { apiClient } from "@/services/apiClient";

/** [CLIENT] 내 예약 상세 조회 */
export const getMyReservationApi = (reservationId: string) =>
  apiClient.get<ReservationDetail>(`/reservations/${reservationId}/me`);

/** [CLIENT] 내 근접한 예약 조회 */
export const getMyCloseReservationApi = () => apiClient.get<Reservation>("/reservations/me/close");

export const prepareReservationApi = (body: CreateReservation) =>
  apiClient.post<{ id: string }>("/reservations/prepare", body);
