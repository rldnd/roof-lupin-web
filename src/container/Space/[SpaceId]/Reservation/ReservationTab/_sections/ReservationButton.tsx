"use client";

import { useParams, useRouter } from "next/navigation";

import { useAtomValue } from "jotai";

import { SpaceDetail } from "@/common/types/space";
import { Button } from "@/components";
import { useQueryString, useSuspenseQuery } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";
import {
  RESERVATION_TAB_MAPPER,
  reservationDepositConfirmState,
  reservationPackageState,
  reservationTimeState,
} from "@/states/reservation";

import styles from "./reservationButton.module.scss";

const ReservationButton: React.FC = () => {
  const { push } = useRouter();
  const { append, getQueryStringWithPath } = useQueryString();

  const { spaceId } = useParams();
  const { data } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const { startAt: timeStartAt, endAt: timeEndAt } = useAtomValue(reservationTimeState);
  const reservationPackage = useAtomValue(reservationPackageState);
  const reservationDepositConfirm = useAtomValue(reservationDepositConfirmState);

  const enabled =
    ((timeStartAt && timeEndAt) || reservationPackage.length > 0) &&
    (!data.deposit || (data.deposit && reservationDepositConfirm));

  const onClickButton = () => {
    push(getQueryStringWithPath(append({ tab: RESERVATION_TAB_MAPPER.PAYMENT })));
  };

  return (
    <Button type="button" color="primary" disabled={!enabled} className={styles.wrapper} onClick={onClickButton}>
      예약하기
    </Button>
  );
};

export default ReservationButton;

export const LoadingReservationButton: React.FC = () => {
  return <Button type="button" color="primary" disabled className={styles.wrapper} />;
};