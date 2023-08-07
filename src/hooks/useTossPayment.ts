import { useCallback, useEffect } from "react";

import { useMutation } from "@tanstack/react-query";
import { loadPaymentWidget, type PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { useAtom, useSetAtom } from "jotai";

import { PaymentPayload } from "@/common/types/payment";
import { deletePaymentWhenFailApi } from "@/services/payment";
import {
  paymentAgreementState,
  paymentCheckedRequiredAgreementState,
  paymentMethodsWidgetState,
  paymentWidgetState,
} from "@/states";

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
  renderAgreement(elementId: string): void;
  createPaymentWidget(args: CreatePaymentWidgetArgs): Promise<void>;
  updatePrice(args: UpdatePriceArgs): void;
  requestPayment(args: PaymentPayload): void;
}

const useTossPayment = (): ReturnUseTossPayment => {
  const [paymentWidget, setPaymentWidget] = useAtom(paymentWidgetState);
  const [paymentMethodsWidget, setPaymentMethodsWidget] = useAtom(paymentMethodsWidgetState);
  const [paymentAgreement, setPaymentAgreement] = useAtom(paymentAgreementState);
  const setPaymentCheckedRequired = useSetAtom(paymentCheckedRequiredAgreementState);

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

  const requestPayment = useCallback(
    async (args: PaymentPayload) => {
      if (!isPaymentWidgetInstance(paymentWidget)) return;
      try {
        await paymentWidget.requestPayment(args as any);
      } catch (error) {
        deletePaymentWhenFail(args.orderId);
      }
    },
    [deletePaymentWhenFail, paymentWidget],
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
    hasPaymentWidget: isPaymentWidgetInstance(paymentWidget),
    hasPaymentMethodsWidget: isPaymentMethodsWidgetInstance(paymentMethodsWidget),
    hasPaymentAgreement: isPaymentAgreement(paymentAgreement),
    renderAgreement,
    createPaymentWidget,
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
