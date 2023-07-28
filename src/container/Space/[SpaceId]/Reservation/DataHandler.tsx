"use client";

import { useCallback, useEffect, useMemo } from "react";

import { useParams, useSearchParams } from "next/navigation";

import { useAtom, useSetAtom } from "jotai";
import { useMount, useUnmount, useUpdateEffect } from "react-use";

import type { SpaceDetail } from "@/common/types/space";
import { useSuspenseQuery } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";
import {
  initialReservation,
  initialReservationTime,
  RESERVATION_TAB_MAPPER,
  reservationAdditionalServicesState,
  reservationDepositConfirmState,
  reservationPackageState,
  reservationState,
  reservationTabState,
  reservationTimeState,
  type Tab,
} from "@/states/reservation";

const DataHandler: React.FC = () => {
  const { spaceId } = useParams();
  const setTab = useSetAtom(reservationTabState);

  const { get } = useSearchParams();

  const { data } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const [tab, year, month, day, userCount] = [get("tab"), get("year"), get("month"), get("day"), get("userCount")];

  const setReservation = useSetAtom(reservationState);
  const setAdditionalServices = useSetAtom(reservationAdditionalServicesState);

  const [time, setTime] = useAtom(reservationTimeState);
  const [packages, setPackages] = useAtom(reservationPackageState);
  const [depositConfirm, setDepositConfirm] = useAtom(reservationDepositConfirmState);

  const canPayment = useMemo<boolean>(
    () =>
      (Boolean(time.startAt && time.endAt) || packages.length > 0) &&
      (!data.deposit || Boolean(data.deposit && depositConfirm)),
    [data.deposit, depositConfirm, packages.length, time.endAt, time.startAt],
  );

  const isRequest = useMemo<boolean>(() => !data.isImmediateReservation, [data.isImmediateReservation]);

  const reset = useCallback(() => {
    setAdditionalServices({});
    setTime(initialReservationTime);
    setPackages([]);
    setDepositConfirm(false);
    setReservation(initialReservation);
  }, [setAdditionalServices, setDepositConfirm, setPackages, setReservation, setTime]);

  useMount(() => {
    if (tab && tab.toLocaleLowerCase().includes("reservation")) reset();
  });

  useEffect(() => {
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

    setReservation((prev) => ({ ...prev, year, month, day, userCount: Number(userCount) }));
    setTab(tab as Tab);
  }, [year, month, day, userCount, setReservation, tab, isRequest, canPayment, setTab, reset]);

  useUpdateEffect(() => {
    window.scrollTo({ top: 0 });
  }, [tab]);

  useUnmount(() => {
    setTab(null);
    reset();
  });

  return null;
};

export default DataHandler;
