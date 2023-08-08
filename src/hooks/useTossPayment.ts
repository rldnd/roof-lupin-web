import { useCallback, useEffect, useMemo } from "react";

import { useMutation } from "@tanstack/react-query";
import { clearPaymentWidget, loadPaymentWidget, type PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { useAtom, useSetAtom } from "jotai";

import type { PaymentPayload } from "@/common/types/payment";
import { deletePaymentWhenFailApi } from "@/services/payment";
import {
  paymentAgreementState,
  paymentCheckedRequiredAgreementState,
  paymentMethodsWidgetState,
  paymentWidgetState,
} from "@/states";

import { useToast } from ".";

export type PaymentMethod = ReturnType<PaymentWidgetInstance["renderPaymentMethods"]>;
export type PaymentPriceUpdateReason = keyof PaymentMethod["UPDATE_REASON"];
export type SelectedPaymentMethod = ReturnType<PaymentMethod["getSelectedPaymentMethod"]>;
export type PaymentAgreement = ReturnType<PaymentWidgetInstance["renderAgreement"]>;

interface CreatePaymentWidgetArgs {
  price: number;
  elementId: string;
  agreementElementId?: string;
}

interface UpdatePriceArgs {
  price: number;
  reason?: PaymentPriceUpdateReason | PaymentPriceUpdateReason[];
}

interface ReturnUseTossPayment {
  hasPaymentWidget: boolean;
  hasPaymentMethodsWidget: boolean;
  hasPaymentAgreement: boolean;
  clearWidgets(): void;
  renderAgreement(elementId: string): void;
  createPaymentWidget(args: CreatePaymentWidgetArgs): Promise<void>;
  updatePrice(args: UpdatePriceArgs): void;
  requestPayment(args: PaymentPayload): void;
}

const useTossPayment = (): ReturnUseTossPayment => {
  const { addToast } = useToast();

  const [paymentWidget, setPaymentWidget] = useAtom(paymentWidgetState);
  const [paymentMethodsWidget, setPaymentMethodsWidget] = useAtom(paymentMethodsWidgetState);
  const [paymentAgreement, setPaymentAgreement] = useAtom(paymentAgreementState);
  const setPaymentCheckedRequired = useSetAtom(paymentCheckedRequiredAgreementState);

  const hasPaymentWidget = useMemo<boolean>(() => isPaymentWidgetInstance(paymentWidget), [paymentWidget]);
  const hasPaymentMethodsWidget = useMemo<boolean>(
    () => isPaymentMethodsWidgetInstance(paymentMethodsWidget),
    [paymentMethodsWidget],
  );
  const hasPaymentAgreement = useMemo<boolean>(() => isPaymentAgreement(paymentAgreement), [paymentAgreement]);

  const { mutate: deletePaymentWhenFail } = useMutation(deletePaymentWhenFailApi);

  const renderAgreement = useCallback(
    (elementId: string) => {
      if (!isPaymentWidgetInstance(paymentWidget)) return;
      setPaymentAgreement(paymentWidget.renderAgreement(`#${elementId}`));
    },
    [paymentWidget, setPaymentAgreement],
  );

  const createPaymentWidget = useCallback(
    async ({ elementId, price, agreementElementId }: CreatePaymentWidgetArgs) => {
      const widget = await loadPaymentWidget(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string,
        process.env.NEXT_PUBLIC_TOSS_SECRET_KEY as string,
      );

      const methodsWidget = widget.renderPaymentMethods(`#${elementId}`, price);

      setPaymentWidget(widget);
      setPaymentMethodsWidget(methodsWidget);
      if (agreementElementId) renderAgreement(agreementElementId);
    },
    [renderAgreement, setPaymentMethodsWidget, setPaymentWidget],
  );

  const updatePrice = useCallback(
    ({ price, reason }: UpdatePriceArgs) => {
      if (!isPaymentMethodsWidgetInstance(paymentMethodsWidget)) return;
      paymentMethodsWidget.updateAmount(price, reason);
    },
    [paymentMethodsWidget],
  );

  const clearWidgets = useCallback(() => {
    if (hasPaymentWidget) {
      clearPaymentWidget();
      setPaymentWidget(undefined);
      setPaymentMethodsWidget(undefined);
      setPaymentAgreement(undefined);
    }
  }, [hasPaymentWidget, setPaymentAgreement, setPaymentMethodsWidget, setPaymentWidget]);

  const requestPayment = useCallback(
    async (args: PaymentPayload) => {
      if (!isPaymentWidgetInstance(paymentWidget)) return;

      try {
        await paymentWidget.requestPayment(args as any);
        clearWidgets();
      } catch (error) {
        addToast({ message: "결제가 취소되었습니다." });
        deletePaymentWhenFail(args.orderId);
      }
    },
    [addToast, clearWidgets, deletePaymentWhenFail, paymentWidget],
  );

  useEffect(() => {
    if (!isPaymentAgreement(paymentAgreement)) return;

    const initialPaymentAgreement = paymentAgreement.getAgreementStatus().agreedRequiredTerms;
    setPaymentCheckedRequired(initialPaymentAgreement);

    paymentAgreement.on("change", (agreementStatus) => {
      setPaymentCheckedRequired(agreementStatus.agreedRequiredTerms);
    });
  }, [paymentAgreement, setPaymentCheckedRequired]);

  return {
    hasPaymentWidget,
    hasPaymentMethodsWidget,
    hasPaymentAgreement,
    renderAgreement,
    createPaymentWidget,
    clearWidgets,
    updatePrice,
    requestPayment,
  };
};

export default useTossPayment;

export const isPaymentWidgetInstance = (widget: PaymentWidgetInstance | undefined): widget is PaymentWidgetInstance => {
  return widget !== undefined;
};

export const isPaymentMethodsWidgetInstance = (widget: PaymentMethod | undefined): widget is PaymentMethod => {
  return widget !== undefined;
};

export const isPaymentAgreement = (arg: PaymentAgreement | undefined): arg is PaymentAgreement => {
  return arg !== undefined;
};
