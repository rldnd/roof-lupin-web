"use client";

import { MouseEventHandler, useState } from "react";

import { useParams } from "next/navigation";

import { useAtom } from "jotai";
import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import type { PossibleRentalTypes } from "@/common/types/rentalType";
import {
  LoadingPriceSelectMenuItem,
  LoadingReservationTimePicker,
  PriceSelectMenuItem,
  ReservationTimePicker,
} from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getSpaceRentalTypePossibleApi } from "@/services/rentalType";
import { reservationPackageState, reservationState, reservationTimeState } from "@/states/reservation";
import { formatHourToAHHMM } from "@/utils/date";

import styles from "./timeAndPackage.module.scss";

// TODO: enabled에서 isLogined 제외하고, 추후 errorBoundary로 대체
const TimeAndPackage: React.FC = () => {
  const { spaceId } = useParams();
  const { isLogined } = useMe();

  const [reservation, setReservation] = useAtom(reservationState);
  const [reservationTime, setReservationTime] = useAtom(reservationTimeState);
  const [reservationPackage, setReservationPackage] = useAtom(reservationPackageState);

  const { year, month, day } = reservation;

  const { data: rentalTypes } = useSuspenseQuery<PossibleRentalTypes>(
    ["getSpaceRentalTypePossible", year, month, day],
    () => getSpaceRentalTypePossibleApi({ spaceId, year: year!, month: month!, day: day! }),
    {
      enabled: Boolean(year) && Boolean(month) && Boolean(day) && isLogined,
      onSuccess: (data) => {
        if (!data.time && data.package.length === 0) throw Error("예약 가능한 날짜가 아닙니다.");
        if (data.time) setReservationTime((prev) => ({ ...prev, rentalTypeId: data.time!.id }));
      },
    },
  );

  const onClickTime: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!rentalTypes.time?.timeCostInfos) return;

    const hour = Number(e.currentTarget.value);
    const [startIndex, clickedIndex] = [
      rentalTypes.time.timeCostInfos.findIndex((item) => item.time === reservationTime.startAt),
      rentalTypes.time.timeCostInfos.findIndex((item) => item.time === hour),
    ];

    const hasStart = startIndex !== -1;
    const hasClickedBeforeStart = hasStart && clickedIndex < startIndex;
    const hasEnd = typeof reservationTime.endAt === "number" && reservationTime.endAt !== -1;
    const hasDisabledBetween =
      hasStart &&
      rentalTypes.time.timeCostInfos.some(
        (item, index) => index > startIndex && index < clickedIndex && !item.isPossible,
      );

    if (!hasStart || hasClickedBeforeStart || (hasStart && hasEnd) || hasDisabledBetween) {
      setReservationTime((prev) => ({ ...prev, startAt: hour, endAt: null, cost: null }));
    } else {
      const cost = rentalTypes.time.timeCostInfos.reduce<number>(
        (acc, cur, index) => (index >= startIndex && index <= clickedIndex ? acc + cur.cost : acc),
        0,
      );
      setReservationTime((prev) => ({ ...prev, endAt: hour, cost }));
    }
  };

  if (!year || !month || !day) return <LoadingTimeAndPackage />;

  return (
    <section className={styles.wrapper}>
      {rentalTypes?.time && (
        <>
          <div className={styles.titleWrapper}>
            <h2>
              시간 단위<small>최소 {rentalTypes?.time?.baseHour}시간 부터</small>
            </h2>
            <button
              type="button"
              className={styles.reset}
              onClick={() => setReservationTime((prev) => ({ ...prev, startAt: null, endAt: null }))}
            >
              초기화
            </button>
          </div>
          <ReservationTimePicker
            infos={rentalTypes.time.timeCostInfos}
            className={styles.timePicker}
            startAt={reservationTime.startAt}
            endAt={reservationTime.endAt}
            onClickTime={onClickTime}
          />
        </>
      )}
      {rentalTypes?.package?.length > 0 && (
        <>
          <h2>
            패키지<small>청소 보증금 100,000원 포함</small>
          </h2>
          <menu className={styles.packageMenu}>
            {rentalTypes.package.map((item) => (
              <li key={item.id}>
                <PriceSelectMenuItem
                  price={item.baseCost}
                  checked={false}
                  disabled={!item.isPossible}
                  name={item.name}
                  description={`${formatHourToAHHMM(item.startAt)}시~${formatHourToAHHMM(item.endAt)}시`}
                />
              </li>
            ))}
          </menu>
        </>
      )}
    </section>
  );
};

export default TimeAndPackage;

export const LoadingTimeAndPackage: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2>
          시간 단위 <Skeleton width={100} />
        </h2>
        <span className={styles.reset}>초기화</span>
      </div>
      <LoadingReservationTimePicker className={styles.timePicker} />
      <h2>
        패키지
        <Skeleton width={100} />
      </h2>
      <div className={styles.packageMenu}>
        {range(3).map((value) => (
          <LoadingPriceSelectMenuItem key={value} className={styles.loadingPriceSelectMenu} />
        ))}
      </div>
    </section>
  );
};
