import { type PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { atom } from "jotai";

import { PAYMENT_REFUND } from "@/common/constants";
import { RefundPayment } from "@/common/types/payment";
import type { PaymentAgreement, PaymentMethod } from "@/hooks/useTossPayment";
import { sessionPersistenceAtom } from "@/utils/jotai";

export const initialPaymentRefund: RefundPayment = {
  cancelReason: "",
  reservationId: "",
};

export const paymentWidgetState = atom<PaymentWidgetInstance | undefined>(undefined);
export const paymentMethodsWidgetState = atom<PaymentMethod | undefined>(undefined);
export const paymentAgreementState = atom<PaymentAgreement | undefined>(undefined);

export const paymentCheckedRequiredAgreementState = atom<boolean>(false);

export const paymentRefundState = sessionPersistenceAtom<RefundPayment>(PAYMENT_REFUND, initialPaymentRefund);
