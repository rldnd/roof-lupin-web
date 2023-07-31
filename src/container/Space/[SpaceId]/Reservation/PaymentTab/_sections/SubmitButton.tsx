"use client";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";

import type { SpaceDetail } from "@/common/types/space";
import { Button } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { useTossPay } from "@/hooks/queries";
import { getClientSpaceApi } from "@/services/space";
import {
  reservationAdditionalServicesState,
  reservationCheckedState,
  reservationPackageState,
  reservationPaymentMethodState,
  reservationState,
  reservationTimeState,
} from "@/states/reservation";
import { getPrepareReservationBody } from "@/utils/reservation";

import styles from "./submitButton.module.scss";

const Submit: React.FC = () => {
  const { prepareTossPay } = useTossPay();

  const { spaceId } = useParams();
  const { data: space } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const reservation = useAtomValue(reservationState);
  const time = useAtomValue(reservationTimeState);
  const packages = useAtomValue(reservationPackageState);
  const additionalServices = useAtomValue(reservationAdditionalServicesState);
  const checked = useAtomValue(reservationCheckedState);
  const method = useAtomValue(reservationPaymentMethodState);

  const body = getPrepareReservationBody(
    reservation,
    time,
    packages,
    additionalServices,
    space.overflowUserCost,
    space.overflowUserCount,
  );

  const disabled =
    !reservation.userName || !reservation.userPhoneNumber || Object.values(checked).some((value) => !value) || !method;

  const onClickButton = async () => {
    if (!body) return;
    if (method === "toss") await prepareTossPay(body);
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
        {(body?.originalCost ?? 0).toLocaleString("ko-KR")}원 결제하기
      </Button>
    </section>
  );
};

export default Submit;

export const LoadingSubmit: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <Button type="button" color="primary" full className={styles.submitButton} disabled>
        결제하기
      </Button>
    </section>
  );
};
