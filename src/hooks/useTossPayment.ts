import { useCallback } from "react";

import { loadPaymentWidget, type PaymentWidgetInstance } from "@tosspayments/payment-widget-sdk";
import { useAtom } from "jotai";

import { paymentMethodsWidgetState, paymentWidgetState } from "@/states/payment";

interface CreatePaymentWidgetArgs {
  price: number;
  elementId: string;
}

interface UpdatePriceArgs {
  price: number;
  reason: keyof ReturnType<PaymentWidgetInstance["renderPaymentMethods"]>["UPDATE_REASON"];
}

interface ReturnUseTossPayment {
  createPaymentWidget(args: CreatePaymentWidgetArgs): Promise<void>;
  updatePrice(args: UpdatePriceArgs): void;
}

const useTossPayment = (): ReturnUseTossPayment => {
  const [paymentWidget, setPaymentWidget] = useAtom(paymentWidgetState);
  const [paymentMethodsWidget, setPaymentMethodsWidget] = useAtom(paymentMethodsWidgetState);

  const createPaymentWidget = useCallback(
    async ({ elementId, price }: CreatePaymentWidgetArgs) => {
      const widget = await loadPaymentWidget(
        process.env.NEXT_PUBLIC_TOSS_CLIENT_KEY as string,
        process.env.NEXT_PUBLIC_TOSS_SECRET_KEY as string,
      );
      const methodsWidget = widget.renderPaymentMethods(`#${elementId}`, price);

      setPaymentWidget(widget);
      setPaymentMethodsWidget(methodsWidget);
    },
    [setPaymentMethodsWidget, setPaymentWidget],
  );

  const updatePrice = useCallback(
    ({ price, reason }: UpdatePriceArgs) => {
      if (!isPaymentMethodsWidgetInstance(paymentMethodsWidget)) return;
      paymentMethodsWidget.updateAmount(price, reason);
    },
    [paymentMethodsWidget],
  );

  return {
    createPaymentWidget,
    updatePrice,
  };
};

export default useTossPayment;

export const isPaymentWidgetInstance = (widget: PaymentWidgetInstance | undefined): widget is PaymentWidgetInstance => {
  return widget !== undefined;
};

export const isPaymentMethodsWidgetInstance = (
  widget: ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | undefined,
): widget is ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> => {
  return widget !== undefined;
};
