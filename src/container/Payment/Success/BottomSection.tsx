"use client";

import React, { Fragment, useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { useAtom, useSetAtom } from "jotai";

import type { SpaceDetail } from "@/common/types/space";
import { Button, DataItem, DataList } from "@/components";
import { LoadingDataItem } from "@/components/Data/DataItem";
import { completePaymentApi } from "@/services/payment";
import {
  initialReservation,
  initialReservationTime,
  reservationAdditionalServicesState,
  reservationDepositConfirmState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
} from "@/states";
import { dayjs } from "@/utils/date";
import { isPackageRentalType, isTimeRentalType } from "@/utils/rentalType";
import { getPrepareReservationBody } from "@/utils/reservation";
import { addHour, getDiffHour, getNextDayText } from "@/utils/time";

import styles from "./bottomSection.module.scss";

interface Props {
  space?: SpaceDetail;
}

const BottomSection: React.FC<Props> = ({ space }) => {
  const { replace } = useRouter();
  const { get } = useSearchParams();
  const [paymentType, orderId, paymentKey, amount] = [
    get("paymentType"),
    get("orderId"),
    get("paymentKey"),
    Number(get("amount")),
  ];

  const [reservation, setReservation] = useAtom(reservationState);
  const [time, setTime] = useAtom(reservationTimeState);
  const [packages, setPackages] = useAtom(reservationPackageState);
  const [additionalServices, setAdditionalServices] = useAtom(reservationAdditionalServicesState);
  const setDepositConfirm = useSetAtom(reservationDepositConfirmState);

  const { mutate: completePayment, data } = useMutation(completePaymentApi, {
    onSuccess: () => {
      setAdditionalServices({});
      setTime(initialReservationTime);
      setPackages([]);
      setDepositConfirm(false);
      setReservation((prev) => ({ ...initialReservation, spaceId: prev.spaceId }));
    },
    onError: () => replace("/payments/failed"),
  });

  const date = dayjs(`${data?.data?.year}-${data?.data?.month}-${data?.data?.day}`).format("YYYY년 MM월 DD일 (ddd)");
  const reservationRentalTypes = data?.data?.rentalTypes.map((rentalType) => rentalType.rentalType) ?? [];
  const reservationAdditionalServices = reservationRentalTypes.flatMap((rentalType) => rentalType.additionalServices);

  useEffect(() => {
    if (!space || Boolean(data)) return;
    if (!orderId || !paymentKey || !amount || !paymentType) throw Error("잘못된 접근입니다.");

    const paymentInfo = getPrepareReservationBody(
      reservation,
      time,
      packages,
      additionalServices,
      space.overflowUserCost,
      space.overflowUserCount,
    );

    if (!paymentInfo) throw Error("잘못된 접근입니다.");
    completePayment({ amount, orderId, paymentKey, paymentInfo });
  }, [
    get,
    completePayment,
    orderId,
    paymentKey,
    amount,
    paymentType,
    reservation,
    time,
    packages,
    additionalServices,
    space,
    data,
  ]);

  if (!data) return <LoadingBottomSection />;

  return (
    <section className={styles.wrapper}>
      <DataList>
        <DataItem label="날짜">
          <time dateTime={date}>{date}</time>
        </DataItem>
        <DataItem label="인원">{data?.data?.userCount}명</DataItem>
        <DataItem label="상품 및 부가서비스">
          {reservationRentalTypes.map((rentalType) => (
            <Fragment key={rentalType.id}>
              {isTimeRentalType(rentalType) && (
                <>
                  시간 단위 예약 ({getNextDayText(rentalType.startAt)}
                  {rentalType.startAt}-{getNextDayText(addHour(rentalType.endAt, 1), rentalType.startAt)}
                  {addHour(rentalType.endAt, 1)}시,
                  {getDiffHour(rentalType.startAt, rentalType.endAt)}시간)
                </>
              )}
              {isPackageRentalType(rentalType) && (
                <>
                  {rentalType.name} ({rentalType.startAt}-{rentalType.endAt}시)
                </>
              )}
              {reservationAdditionalServices.length > 0 && (
                <>
                  <br />
                  부가서비스: {reservationAdditionalServices.map((item) => item.name).join(",")}
                </>
              )}
            </Fragment>
          ))}
        </DataItem>
        <DataItem label="결제 금액">{data?.data?.totalCost?.toLocaleString("ko-KR")}원</DataItem>
      </DataList>
      <Button type="button" color="secondary" full>
        예약 내역 확인
      </Button>
    </section>
  );
};

export default BottomSection;

export const LoadingBottomSection: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <DataList>
        <LoadingDataItem />
        <LoadingDataItem />
        <LoadingDataItem />
      </DataList>
      <Button type="button" color="secondary" full disabled>
        예약 내역 확인
      </Button>
    </section>
  );
};
