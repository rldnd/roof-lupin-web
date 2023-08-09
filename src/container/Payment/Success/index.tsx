"use client";

import React, { useEffect, useState } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";

import type { SpaceDetail } from "@/common/types/space";
import { Button, Loading } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { completePaymentApi } from "@/services/payment";
import { getClientSpaceApi } from "@/services/space";
import {
  initialReservation,
  initialReservationTime,
  reservationAdditionalServicesState,
  reservationDepositConfirmState,
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

  const [paymentType, orderId, paymentKey, amount] = [
    get("paymentType"),
    get("orderId"),
    get("paymentKey"),
    Number(get("amount")),
  ];

  const [reservation, setReservation] = useAtom(reservationState);
  const [time, setTime] = useAtom(reservationTimeState);
  const [packages, setPackages] = useAtom(reservationPackageState);
  const [additionalServices, setAdditionalServices] = useAtom(reservationAdditionalServicesState);
  const setDepositConfirm = useSetAtom(reservationDepositConfirmState);

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

  useEffect(() => {
    if (status === "loading") return;

    setAdditionalServices({});
    setTime(initialReservationTime);
    setPackages([]);
    setDepositConfirm(false);
    setReservation(initialReservation);
  }, [setAdditionalServices, setDepositConfirm, setPackages, setReservation, setTime, status]);

  return (
    <>
      <main className={styles.wrapper}>
        {status === "success" && <h1>{get("amount")}원이 결제되었습니다</h1>}
        {status === "fail" && <h1>결제에 실패했습니다</h1>}
        <Button type="button" onClick={() => router.replace("/")} color="primary" full>
          홈으로
        </Button>
      </main>
      <Loading isShow={status === "loading"} />
    </>
  );
};

export default PaymentSuccessContainer;
