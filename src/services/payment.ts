import type { ConfirmTossPayment } from "@/common/types/payment";
import type { CreateReservation } from "@/common/types/reservation";
import { apiClient } from "@/services/apiClient";

export const preparePaymentTossApi = (body: CreateReservation) =>
  apiClient.post<{ url: string }>("/payments/toss/prepare", body);

export const completePaymentTossApi = (body: ConfirmTossPayment) =>
  apiClient.post<{ id: string }>("/payments/toss/complete", body);
