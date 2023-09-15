"use client";

import { useEffect } from "react";

import { REQUEST_RESERVATION_AGREEMENT_WIDGET_ID } from "@/common/constants";
import { useTossPayment } from "@/hooks";

const Agreement: React.FC = () => {
  const { hasPaymentWidget, renderAgreement } = useTossPayment();

  useEffect(() => {
    if (hasPaymentWidget) renderAgreement(REQUEST_RESERVATION_AGREEMENT_WIDGET_ID);
  }, [hasPaymentWidget, renderAgreement]);

  return <section id={REQUEST_RESERVATION_AGREEMENT_WIDGET_ID} />;
};

export default Agreement;
