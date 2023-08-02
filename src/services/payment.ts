import type {
  ApproveKakaoPayment,
  CompletePortOnePayment,
  ConfirmTossPayment,
  PortOnePreparePayment,
  PrepareKakaoPayment,
} from "@/common/types/payment";
import type { CreateReservation } from "@/common/types/reservation";
import { apiClient } from "@/services/apiClient";

export const preparePaymentTossApi = (body: CreateReservation) =>
  apiClient.post<{ url: string }>("/payments/toss/prepare", body);

export const completePaymentTossApi = (body: ConfirmTossPayment) =>
  apiClient.post<{ id: string }>("/payments/toss/complete", body);

export const preparePaymentKakaoApi = (body: CreateReservation) =>
  apiClient.post<PrepareKakaoPayment>("/payments/kakao/prepare", body);

export const completePaymentKakaoApi = (body: ApproveKakaoPayment) =>
  apiClient.post<{ id: string }>("/payments/kakao/complete", body);

export const preparePaymentPortOneApi = (body: CreateReservation) =>
  apiClient.post<PortOnePreparePayment>("/payments/port-one/prepare", body);

export const completePaymentPortOneApi = (body: CompletePortOnePayment) =>
  apiClient.post<{ id: string }>("/payments/port-one/complete", body);
