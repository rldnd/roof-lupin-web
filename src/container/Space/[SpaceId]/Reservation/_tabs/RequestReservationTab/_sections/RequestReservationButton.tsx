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
} from "@/states";

import styles from "./requestReservationButton.module.scss";

const RequestReservationButton: React.FC = () => {
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
    push(getQueryStringWithPath(append({ tab: RESERVATION_TAB_MAPPER.REQUEST_PAYMENT })));
  };

  return (
    <Button type="button" color="primary" disabled={!enabled} className={styles.wrapper} onClick={onClickButton}>
      예약 요청하기
    </Button>
  );
};

export default RequestReservationButton;

export const LoadingRequestReservationButton: React.FC = () => {
  return <Button type="button" color="primary" disabled className={styles.wrapper} />;
};
