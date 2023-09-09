import type { ConfirmTossPayment, CreatePaymentPayload, PaymentPayload, RefundPayment } from "@/common/types/payment";
import type { Reservation } from "@/common/types/reservation";
import { apiClient } from "@/services/apiClient";

export const createPaymentPayloadApi = (body: CreatePaymentPayload) =>
  apiClient.post<PaymentPayload>("/payments/payload", body);

export const completePaymentApi = (body: ConfirmTossPayment) => apiClient.post<Reservation>("/payments/complete", body);

export const refundPaymentApi = (body: RefundPayment) => apiClient.post<{ id: string }>("/payments/refund", body);
