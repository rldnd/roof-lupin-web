"use client";

import { useMutation } from "@tanstack/react-query";

import type { ErrorDTO } from "@/common/types/common";
import type { CreateReservationRentalType, ReservationDetail } from "@/common/types/reservation";
import { Button } from "@/components";
import { useToast, useTossPayment } from "@/hooks";
import { isAxiosError } from "@/services/apiClient";
import { createPaymentPayloadApi } from "@/services/payment";

import styles from "./submitButton.module.scss";

interface Props {
  reservation: ReservationDetail;
  disabled: boolean;
}

const SubmitButton: React.FC<Props> = ({ disabled, reservation }) => {
  const {
    year,
    month,
    day,
    userName,
    userPhoneNumber,
    userCount,
    totalCost,
    discountCost,
    originalCost,
    rentalTypes,
    space,
    additionalServices,
    id: reservationId,
  } = reservation;
  const { addToast } = useToast();

  const { id: spaceId } = space;

  const { requestPayment } = useTossPayment();

  const { mutate: createPayload } = useMutation(createPaymentPayloadApi, {
    onSuccess: (data) => requestPayment(data.data),
    onError: (error) => {
      if (isAxiosError<ErrorDTO>(error) && error.response?.data) {
        addToast({ message: error.response.data.message });
      }
    },
  });

  const onClickButton = () => {
    const parsedRentalTypes = rentalTypes.map<CreateReservationRentalType>((item) => {
      const { startAt, endAt, rentalTypeId } = item;
      const parsedAdditionalServices = additionalServices.filter((service) => service.rentalTypeId === rentalTypeId);
      return { startAt, endAt, rentalTypeId, additionalServices: parsedAdditionalServices };
    });

    createPayload({
      year,
      month,
      day,
      userName,
      userPhoneNumber,
      userCount,
      totalCost,
      discountCost,
      originalCost,
      rentalTypes: parsedRentalTypes,
      reservationId,
      spaceId,
    });
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
        {reservation.totalCost.toLocaleString("ko-KR")}원 결제하기
      </Button>
    </section>
  );
};

export default SubmitButton;
