"use client";

import { useParams } from "next/navigation";

import { useAtom } from "jotai";
import { useUnmount } from "react-use";

import type { ReservationDetail } from "@/common/types/reservation";
import { useSuspenseQuery, useTossPayment } from "@/hooks";
import { getMyReservationApi } from "@/services/reservation";
import { paymentCheckedRequiredAgreementState } from "@/states";

import {
  Agreement,
  FreeCancelTerm,
  PaymentMethod,
  PriceInfo,
  ReservationClerkInfo,
  SelectedReservationInfo,
  SubmitButton,
} from "./_sections";

import styles from "./view.module.scss";

const View: React.FC = () => {
  const { clearWidgets } = useTossPayment();
  const { reservationId } = useParams();
  const [agreement, setAgreement] = useAtom(paymentCheckedRequiredAgreementState);
  const { data: reservation } = useSuspenseQuery<ReservationDetail>(
    ["getMyReservation", reservationId],
    () => getMyReservationApi(reservationId),
    {
      onSuccess: (data) => {
        if (data.status !== "APPROVED") throw Error("잘못된 접근입니다.");
      },
    },
  );

  useUnmount(() => {
    setAgreement(false);
    clearWidgets();
  });

  return (
    <main className={styles.wrapper}>
      <SelectedReservationInfo reservation={reservation} />
      <hr />
      <ReservationClerkInfo reservation={reservation} />
      <hr />
      <PriceInfo reservation={reservation} />
      <hr />
      <PaymentMethod reservation={reservation} />
      <hr />
      <FreeCancelTerm reservation={reservation} />
      <hr />
      <Agreement />
      <SubmitButton reservation={reservation} disabled={!agreement} />
    </main>
  );
};

export default View;

export const LoadingView: React.FC = () => {
  return null;
};
