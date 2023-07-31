"use client";

import { useParams } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import type { SpaceDetail } from "@/common/types/space";
import { Button } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { prepareReservationApi } from "@/services/reservation";
import { getClientSpaceApi } from "@/services/space";
import {
  reservationAdditionalServicesState,
  reservationCheckedState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
} from "@/states/reservation";
import { getPrepareReservationBody } from "@/utils/reservation";

import styles from "./submitButton.module.scss";

const Submit: React.FC = () => {
  const { spaceId } = useParams();
  const { mutate: prepareReservation } = useMutation(prepareReservationApi);

  const { data: space } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const reservation = useAtomValue(reservationState);
  const time = useAtomValue(reservationTimeState);
  const packages = useAtomValue(reservationPackageState);
  const additionalServices = useAtomValue(reservationAdditionalServicesState);
  const checked = useAtomValue(reservationCheckedState);

  const disabled =
    !reservation.userName || !reservation.userPhoneNumber || Object.values(checked).some((value) => !value);

  const onClickButton = () => {
    const body = getPrepareReservationBody(
      reservation,
      time,
      packages,
      additionalServices,
      space.overflowUserCost,
      space.overflowUserCount,
    );
    if (!body) return;

    prepareReservation(body);
  };

  return (
    <section className={styles.wrapper}>
      <Button
        type="button"
        color="primary"
        full
        className={styles.submitButton}
        disabled={disabled}
        onClick={onClickButton}
      >
        지금 예약 요청하기
      </Button>
    </section>
  );
};

export default Submit;

export const LoadingSubmit: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <Button type="button" color="primary" full className={styles.submitButton} disabled>
        지금 예약 요청하기
      </Button>
    </section>
  );
};
