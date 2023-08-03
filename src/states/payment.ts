import { type PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { atom } from "jotai";

export const paymentWidgetState = atom<PaymentWidgetInstance | undefined>(undefined);
export const paymentMethodsWidgetState = atom<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | undefined>(
  undefined,
);
