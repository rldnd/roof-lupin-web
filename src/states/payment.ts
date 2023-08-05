import { type PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { atom } from "jotai";

import type { PaymentAgreement, PaymentMethod } from "@/hooks/useTossPayment";

export const paymentWidgetState = atom<PaymentWidgetInstance | undefined>(undefined);
export const paymentMethodsWidgetState = atom<PaymentMethod | undefined>(undefined);
export const paymentAgreementState = atom<PaymentAgreement | undefined>(undefined);

export const paymentCheckedRequiredAgreementState = atom<boolean>(false);
