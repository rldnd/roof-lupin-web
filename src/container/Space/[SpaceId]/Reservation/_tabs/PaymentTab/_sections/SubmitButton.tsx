"use client";

import { useParams } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useAtomValue } from "jotai";

import type { SpaceDetail } from "@/common/types/space";
import { Button } from "@/components";
import { useSuspenseQuery, useTossPayment } from "@/hooks";
import { createPaymentPayloadApi } from "@/services/payment";
import { getClientSpaceApi } from "@/services/space";
import {
  paymentCheckedRequiredAgreementState,
  reservationAdditionalServicesState,
  reservationCouponState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
} from "@/states";
import { getPrepareReservationBody } from "@/utils/reservation";

import styles from "./submitButton.module.scss";

const Submit: React.FC = () => {
  const { spaceId } = useParams();
  const { data: space } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));
  const checkedRequired = useAtomValue(paymentCheckedRequiredAgreementState);

  const { requestPayment } = useTossPayment();

  const { mutate: createPayload } = useMutation(createPaymentPayloadApi, {
    onSuccess: (data) => requestPayment({ ...data.data, successUrl: `http://localhost:3000/payments/success` }),
  });

  const reservation = useAtomValue(reservationState);
  const time = useAtomValue(reservationTimeState);
  const packages = useAtomValue(reservationPackageState);
  const additionalServices = useAtomValue(reservationAdditionalServicesState);
  const coupons = useAtomValue(reservationCouponState);

  const body = getPrepareReservationBody(
    reservation,
    time,
    packages,
    additionalServices,
    coupons,
    space.overflowUserCost,
    space.overflowUserCount,
  );

  const disabled = !reservation.userName || !reservation.userPhoneNumber || !checkedRequired;

  const onClickButton = async () => {
    if (!body) return;
    createPayload(body);
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
        {(body?.totalCost ?? 0).toLocaleString("ko-KR")}원 결제하기
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
