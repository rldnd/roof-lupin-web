"use client";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";

import { SpaceDetail } from "@/common/types/space";
import { Button } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";
import { reservationDepositConfirmState, reservationPackageState, reservationTimeState } from "@/states/reservation";

import styles from "./reservationButton.module.scss";

const ReservationButton: React.FC = () => {
  const { spaceId } = useParams();
  const { data } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const { startAt: timeStartAt, endAt: timeEndAt } = useAtomValue(reservationTimeState);
  const reservationPackage = useAtomValue(reservationPackageState);
  const reservationDepositConfirm = useAtomValue(reservationDepositConfirmState);

  const enabled = ((timeStartAt && timeEndAt) || reservationPackage.length > 0) && reservationDepositConfirm;

  return (
    <Button type="button" color="primary" disabled={!enabled} className={styles.wrapper}>
      {data.isImmediateReservation ? "예약하기" : "얘약 요청하기"}
    </Button>
  );
};

export default ReservationButton;

export const LoadingReservationButton: React.FC = () => {
  return <Button type="button" color="primary" disabled className={styles.wrapper} />;
};
