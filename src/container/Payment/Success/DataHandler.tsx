"use client";

import { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";

import type { SpaceDetail } from "@/common/types/space";
import { useSuspenseQuery } from "@/hooks";
import { completePaymentApi } from "@/services/payment";
import { getClientSpaceApi } from "@/services/space";
import {
  initialReservation,
  initialReservationTime,
  reservationAdditionalServicesState,
  reservationCouponState,
  reservationDepositConfirmState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
} from "@/states";
import { getPrepareReservationBody } from "@/utils/reservation";

const DataHandler: React.FC = () => {
  const { push } = useRouter();
  const { get } = useSearchParams();

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
  const [coupon, setCoupon] = useAtom(reservationCouponState);
  const setDepositConfirm = useSetAtom(reservationDepositConfirmState);

  const { data: space } = useSuspenseQuery<SpaceDetail>(
    ["getClientSpace", reservation.spaceId],
    () => getClientSpaceApi(reservation.spaceId!),
    {
      enabled: Boolean(reservation.spaceId),
      suspense: false,
    },
  );

  const { mutate: completePayment, isSuccess } = useMutation(completePaymentApi, {
    onSuccess: (data) => {
      setAdditionalServices({});
      setTime(initialReservationTime);
      setPackages([]);
      setDepositConfirm(false);
      setReservation(initialReservation);
      setCoupon([]);
      push(`/reservations/${data.data.id}`);
    },
    onError: () => push("/payments/failed"),
  });

  useEffect(() => {
    if (!space || isSuccess) return;
    if (!orderId || !paymentKey || !amount || !paymentType) throw Error("잘못된 접근입니다.");

    const paymentInfo = getPrepareReservationBody(
      reservation,
      time,
      packages,
      additionalServices,
      coupon,
      space.overflowUserCost,
      space.overflowUserCount,
    );

    if (!paymentInfo) throw Error("잘못된 접근입니다.");
    completePayment({ amount, orderId, paymentKey, paymentInfo });
  }, [
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
    coupon,
    isSuccess,
  ]);

  return null;
};

export default DataHandler;
