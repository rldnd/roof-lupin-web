"use client";

import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import type { SpaceDetail } from "@/common/types/space";
import { Button } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { completePaymentApi } from "@/services/payment";
import { getClientSpaceApi } from "@/services/space";
import {
  reservationAdditionalServicesState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
} from "@/states";
import { getPrepareReservationBody } from "@/utils/reservation";

import styles from "./paymentSuccessContainer.module.scss";

type Status = "loading" | "success" | "fail";

// TODO: server component & client component 분리
const PaymentSuccessContainer: React.FC = () => {
  const router = useRouter();
  const { get } = useSearchParams();

  const [status, setStatus] = useState<Status>("loading");

  const paymentType = get("paymentType");
  const orderId = get("orderId");
  const paymentKey = get("paymentKey");
  const amount = Number(get("amount"));

  const reservation = useAtomValue(reservationState);
  const time = useAtomValue(reservationTimeState);
  const packages = useAtomValue(reservationPackageState);
  const additionalServices = useAtomValue(reservationAdditionalServicesState);

  const { data: space } = useSuspenseQuery<SpaceDetail>(["getClientSpace", reservation.spaceId], () =>
    getClientSpaceApi(reservation.spaceId!),
  );

  const { mutate: completePayment } = useMutation(completePaymentApi, {
    onSuccess: () => setStatus("success"),
    onError: () => setStatus("fail"),
  });

  useEffect(() => {
    if (!space) return;
    if (!orderId || !paymentKey || !amount || !paymentType) throw Error("잘못된 접근입니다.");

    const paymentInfo = getPrepareReservationBody(
      reservation,
      time,
      packages,
      additionalServices,
      space.overflowUserCost,
      space.overflowUserCount,
    );

    if (!paymentInfo) throw Error("잘못된 접근입니다.");
    completePayment({ amount, orderId, paymentKey, paymentInfo });
  }, [
    router,
    get,
    completePayment,
    orderId,
    paymentKey,
    amount,
    paymentType,
    reservation,
    time,
    packages,
    additionalServices,
    space,
  ]);

  return (
    <main className={styles.wrapper}>
      {status === "success" && <h1>당신의 돈 {get("amount")}원이 날라갔습니다.. 바바이티비..</h1>}
      {status === "fail" && <h1>결제에 실패했습니다..</h1>}
      <Button type="button" onClick={() => router.replace("/")} color="primary" full>
        홈으로
      </Button>
    </main>
  );
};

export default PaymentSuccessContainer;
