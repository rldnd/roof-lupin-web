import type { ConfirmTossPayment, CreatePaymentPayload, PaymentPayload } from "@/common/types/payment";
import { apiClient } from "@/services/apiClient";

export const createPaymentPayloadApi = (body: CreatePaymentPayload) =>
  apiClient.post<PaymentPayload>("/payments/payload", body);

export const completePaymentApi = (body: ConfirmTossPayment) =>
  apiClient.post<{ id: string }>("/payments/complete", body);

export const deletePaymentWhenFailApi = (orderId: string) => apiClient.delete(`/payments/failure/${orderId}`);
