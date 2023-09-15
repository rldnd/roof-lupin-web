"use client";

import { useEffect } from "react";

import { REQUEST_RESERVATION_PAYMENT_WIDGET_ID } from "@/common/constants";
import type { ReservationDetail } from "@/common/types/reservation";
import { useTossPayment } from "@/hooks";

import styles from "./paymentMethod.module.scss";

interface Props {
  reservation: ReservationDetail;
}

const PaymentMethod: React.FC<Props> = ({ reservation }) => {
  const { createPaymentWidget, hasPaymentWidget } = useTossPayment();

  useEffect(() => {
    if (hasPaymentWidget) return;
    createPaymentWidget({ elementId: REQUEST_RESERVATION_PAYMENT_WIDGET_ID, price: reservation.totalCost });
  }, [createPaymentWidget, hasPaymentWidget, reservation.totalCost]);

  return <section id={REQUEST_RESERVATION_PAYMENT_WIDGET_ID} className={styles.wrapper} />;
};

export default PaymentMethod;
