"use client";

import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import { Button } from "@/components";
import { prepareReservationApi } from "@/services/reservation";
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
  const { mutate: prepareReservation } = useMutation(prepareReservationApi);

  const reservation = useAtomValue(reservationState);
  const time = useAtomValue(reservationTimeState);
  const packages = useAtomValue(reservationPackageState);
  const additionalServices = useAtomValue(reservationAdditionalServicesState);
  const checked = useAtomValue(reservationCheckedState);

  const disabled =
    !reservation.userName || !reservation.userPhoneNumber || Object.values(checked).some((value) => !value);

  const onClickButton = () => {
    const body = getPrepareReservationBody(reservation, time, packages, additionalServices);
    console.log(body);
  };

  return (
    <section className={styles.wrapper}>
      <Button color="primary" full className={styles.submitButton} disabled={disabled} onClick={onClickButton}>
        지금 예약 요청하기
      </Button>
    </section>
  );
};

export default Submit;
