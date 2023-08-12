import type { ConfirmTossPayment, CreatePaymentPayload, PaymentPayload } from "@/common/types/payment";
import type { ReservationDetail } from "@/common/types/reservation";
import { apiClient } from "@/services/apiClient";

export const createPaymentPayloadApi = (body: CreatePaymentPayload) =>
  apiClient.post<PaymentPayload>("/payments/payload", body);

export const completePaymentApi = (body: ConfirmTossPayment) =>
  apiClient.post<ReservationDetail>("/payments/complete", body);
