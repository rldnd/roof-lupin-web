/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useCallback, useEffect, useMemo } from "react";

import { useParams, useSearchParams } from "next/navigation";

import { useAtom, useSetAtom } from "jotai";
import { useMount } from "react-use";

import type { SpaceDetail } from "@/common/types/space";
import { useSuspenseQuery, useTossPayment } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";
import {
  initialReservation,
  initialReservationTime,
  paymentCheckedRequiredAgreementState,
  RESERVATION_TAB_MAPPER,
  reservationAdditionalServicesState,
  reservationCouponState,
  reservationDepositConfirmState,
  reservationPackageState,
  reservationState,
  reservationTabState,
  reservationTimeState,
  type Tab,
} from "@/states";
import { isUnderTimeReservation } from "@/utils/rentalType";

const DataHandler: React.FC = () => {
  const { spaceId } = useParams();
  const setTab = useSetAtom(reservationTabState);
  const setPaymentCheckedRequired = useSetAtom(paymentCheckedRequiredAgreementState);
  const { clearWidgets } = useTossPayment();

  const { get } = useSearchParams();
  const tab = get("tab");

  const { data } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const setReservation = useSetAtom(reservationState);
  const setAdditionalServices = useSetAtom(reservationAdditionalServicesState);
  const setCoupon = useSetAtom(reservationCouponState);

  const [time, setTime] = useAtom(reservationTimeState);
  const [packages, setPackages] = useAtom(reservationPackageState);
  const [depositConfirm, setDepositConfirm] = useAtom(reservationDepositConfirmState);

  const canPayment = useMemo<boolean>(
    () =>
      (isUnderTimeReservation(time) || packages.length > 0) &&
      (!data.deposit || Boolean(data.deposit && depositConfirm)),
    [data.deposit, depositConfirm, packages.length, time],
  );

  const isRequest = useMemo<boolean>(() => !data.isImmediateReservation, [data.isImmediateReservation]);

  const resetReservationInfo = useCallback(() => {
    setAdditionalServices({});
    setTime(initialReservationTime);
    setPackages([]);
    setDepositConfirm(false);
    setReservation(initialReservation);
  }, [setAdditionalServices, setDepositConfirm, setPackages, setReservation, setTime]);

  const resetPaymentInfo = useCallback(() => {
    setPaymentCheckedRequired(false);
    clearWidgets();
    setCoupon([]);
  }, [clearWidgets, setPaymentCheckedRequired, setCoupon]);

  useMount(() => {
    const [tab, year, month, day, userCount] = [get("tab"), get("year"), get("month"), get("day"), get("userCount")];

    if (
      !year ||
      !month ||
      !day ||
      !userCount ||
      !tab ||
      !Object.values(RESERVATION_TAB_MAPPER).includes(tab) ||
      tab.toLocaleLowerCase().includes("request") !== isRequest ||
      (tab.toLocaleLowerCase().includes("payment") && !canPayment)
    ) {
      throw Error("잘못된 접근입니다.");
    }

    if (tab.toLocaleLowerCase().includes("reservation")) resetReservationInfo();

    setReservation((prev) => ({
      ...prev,
      year: Number(year),
      month: Number(month),
      day: Number(day),
      userCount: Number(userCount),
      spaceId,
    }));
  });

  useEffect(() => {
    setTab(tab as Tab);
    resetPaymentInfo();
  }, [setTab, tab]);

  return null;
};

export default DataHandler;
