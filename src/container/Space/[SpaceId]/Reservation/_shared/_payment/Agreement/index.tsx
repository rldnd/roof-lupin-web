"use client";

import { useEffect } from "react";

import { useTossPayment } from "@/hooks";

const AGREEMENT_WIDGET_ID = "agreement-widget";

const Agreement: React.FC = () => {
  const { hasPaymentWidget, renderAgreement } = useTossPayment();

  useEffect(() => {
    if (hasPaymentWidget) renderAgreement(AGREEMENT_WIDGET_ID);
  }, [hasPaymentWidget, renderAgreement]);

  return <section id={AGREEMENT_WIDGET_ID} />;
};

export default Agreement;
