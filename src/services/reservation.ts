import { BasePaginationQueryParams, PagingDTO } from "@/common/types/common";
import type { CreateReservation, Reservation, ReservationDetail, ReservationStatus } from "@/common/types/reservation";
import { apiClient } from "@/services/apiClient";

export interface PaginateMyReservationsParams extends BasePaginationQueryParams {
  year?: number;
  month?: number;
  day?: number;
  spaceId?: string;
  isApproved?: boolean;
  isCanceled?: boolean;
  isReviewed?: boolean;
  isUsed?: boolean;
  isApproaching?: boolean;
  status?: ReservationStatus;
}

/** [CLIENT] 내 예약 상세 조회 */
export const getMyReservationApi = (reservationId: string) =>
  apiClient.get<ReservationDetail>(`/reservations/${reservationId}/me`);

/** [CLIENT] 내 근접한 예약 조회 */
export const getMyCloseReservationApi = () => apiClient.get<Reservation>("/reservations/me/close");

/** [CLIENT] 내 예약 조회 */
export const paginateMyReservationsApi = (params: PaginateMyReservationsParams) =>
  apiClient.get<PagingDTO<Reservation>>("/reservations/me/paging", { params });

export const prepareReservationApi = (body: CreateReservation) =>
  apiClient.post<{ id: string }>("/reservations/prepare", body);
