"use client";

import { useEffect } from "react";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";

import type { SpaceDetail } from "@/common/types/space";
import { useSuspenseQuery, useTossPayment } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";
import {
  reservationAdditionalServicesState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
} from "@/states";
import { getOriginalCost } from "@/utils/reservation";

import styles from "./paymentMethod.module.scss";

const PAYMENT_WIDGET_ID = "payment-widget";

const PaymentMethod: React.FC = () => {
  const { spaceId } = useParams();
  const { createPaymentWidget, hasPaymentWidget } = useTossPayment();

  const { data: space } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const { userCount } = useAtomValue(reservationState);
  const time = useAtomValue(reservationTimeState);
  const packages = useAtomValue(reservationPackageState);
  const additionalServices = useAtomValue(reservationAdditionalServicesState);

  useEffect(() => {
    if (!userCount || hasPaymentWidget) return;
    const originalCost = getOriginalCost(
      time,
      packages,
      additionalServices,
      userCount,
      space.overflowUserCost,
      space.overflowUserCount,
    );

    createPaymentWidget({ elementId: PAYMENT_WIDGET_ID, price: originalCost });
  }, [additionalServices, createPaymentWidget, packages, space, time, userCount, hasPaymentWidget]);

  return <section id={PAYMENT_WIDGET_ID} className={styles.wrapper} />;
};

export default PaymentMethod;
