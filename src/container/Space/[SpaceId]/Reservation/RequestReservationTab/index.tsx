"use client";

import { Suspense } from "react";

import { useSetAtom } from "jotai";

import { reservationTabState } from "@/states/reservation";

import { HostApprove } from "./_sections";
import {
  Discount,
  FreeCancelTerm,
  Header,
  PriceInfo,
  ReservationClerkInfo,
  SelectedReservationInfo,
  Submit,
  UserInfo,
} from "../_shared";

import styles from "./requestReservationTab.module.scss";

const RequestReservationTab: React.FC = () => {
  const setTab = useSetAtom(reservationTabState);

  return (
    <main className={styles.wrapper}>
      <Header title="예약 요청" onClickBack={() => setTab("reservation")} />
      <Suspense fallback={null}>
        <SelectedReservationInfo />
      </Suspense>
      <hr />
      <ReservationClerkInfo />
      <hr />
      <UserInfo />
      <hr />
      <Discount />
      <hr />
      <PriceInfo />
      <hr />
      <FreeCancelTerm />
      <hr />
      <HostApprove />
      <hr />
      <Submit buttonText="지금 예약 요청하기" />
    </main>
  );
};

export default RequestReservationTab;
