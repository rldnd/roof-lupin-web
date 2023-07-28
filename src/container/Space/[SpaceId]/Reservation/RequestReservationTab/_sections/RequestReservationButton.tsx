"use client";

import { useParams } from "next/navigation";

import { useAtomValue, useSetAtom } from "jotai";

import { SpaceDetail } from "@/common/types/space";
import { Button } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";
import {
  reservationDepositConfirmState,
  reservationPackageState,
  reservationTabState,
  reservationTimeState,
} from "@/states/reservation";

import styles from "./requestReservationButton.module.scss";

const RequestReservationButton: React.FC = () => {
  const setTab = useSetAtom(reservationTabState);

  const { spaceId } = useParams();
  const { data } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const { startAt: timeStartAt, endAt: timeEndAt } = useAtomValue(reservationTimeState);
  const reservationPackage = useAtomValue(reservationPackageState);
  const reservationDepositConfirm = useAtomValue(reservationDepositConfirmState);

  const enabled =
    ((timeStartAt && timeEndAt) || reservationPackage.length > 0) &&
    (!data.deposit || (data.deposit && reservationDepositConfirm));

  return (
    <Button type="button" color="primary" disabled={!enabled} className={styles.wrapper} onClick={() => {}}>
      예약 요청하기
    </Button>
  );
};

export default RequestReservationButton;

export const LoadingRequestReservationButton: React.FC = () => {
  return <Button type="button" color="primary" disabled className={styles.wrapper} />;
};
