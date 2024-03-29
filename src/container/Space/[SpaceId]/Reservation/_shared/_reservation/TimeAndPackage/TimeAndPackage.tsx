"use client";

import { ChangeEventHandler, MouseEventHandler } from "react";

import { useParams } from "next/navigation";

import { useAtom, useAtomValue, useSetAtom } from "jotai";
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
import { getSpaceRentalTypePossibleApi } from "@/services/rentalType";
import {
  BaseReservationAdditionalService,
  initialReservationTime,
  reservationAdditionalServicesState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
} from "@/states";
import { deletePropertyInObject } from "@/utils/function";
import { isUnderTimeReservation } from "@/utils/rentalType";
import { formatHourToAHHMM } from "@/utils/time";

import styles from "./timeAndPackage.module.scss";

const TimeAndPackage: React.FC = () => {
  const { spaceId } = useParams();

  const reservation = useAtomValue(reservationState);
  const [reservationTime, setReservationTime] = useAtom(reservationTimeState);
  const [reservationPackage, setReservationPackage] = useAtom(reservationPackageState);
  const setReservationAdditionalServices = useSetAtom(reservationAdditionalServicesState);

  const { year, month, day } = reservation;

  const { data: rentalTypes } = useSuspenseQuery<PossibleRentalTypes>(
    ["getSpaceRentalTypePossible", spaceId, year, month, day],
    () => getSpaceRentalTypePossibleApi({ spaceId, year: year!, month: month!, day: day! }),
    {
      enabled: Boolean(year) && Boolean(month) && Boolean(day),
      onSuccess: (data) => {
        if (!data.time && data.package.length === 0) throw Error("예약 가능한 날짜가 아닙니다.");
      },
    },
  );

  const handleResetTime = () => {
    setReservationTime((prev) => ({ ...prev, startAt: null, endAt: null, cost: null }));
    setReservationAdditionalServices((prev) => deletePropertyInObject(prev, reservationTime.rentalTypeId as string));
  };

  const handleResetPackage = () => {
    setReservationPackage([]);
    setReservationAdditionalServices({});
  };

  const onClickTime: MouseEventHandler<HTMLButtonElement> = (e) => {
    if (!rentalTypes.time?.timeCostInfos || !rentalTypes.time.id) return;
    handleResetPackage();

    const hour = Number(e.currentTarget.value);

    const hasStart = reservationTime.startAt !== null;
    const hasClickedBeforeStart = hasStart && hour <= reservationTime.startAt!;
    const hasEnd = typeof reservationTime.endAt === "number";
    const hasDisabledBetween =
      hasStart &&
      rentalTypes.time.timeCostInfos.some(
        (item) => item.time > reservationTime.startAt! && item.time < hour && !item.isPossible,
      );

    // MEMO: 시작 시간을 선택하게 되는 경우
    if (!hasStart || hasClickedBeforeStart || (hasStart && hasEnd) || hasDisabledBetween) {
      setReservationTime({ ...initialReservationTime, startAt: hour });
    } else {
      //MEMO: 끝 시간을 선택하게 되는 경우
      const cost = rentalTypes.time.timeCostInfos.reduce<number>(
        (acc, cur) => (cur.time >= reservationTime.startAt! && cur.time <= hour ? acc + cur.cost : acc),
        0,
      );
      setReservationTime((prev) => ({ ...prev, endAt: hour, cost, rentalTypeId: rentalTypes.time!.id }));
      setReservationAdditionalServices({
        [rentalTypes.time!.id as string]: rentalTypes.time.additionalServices.map<BaseReservationAdditionalService>(
          (item) => ({ ...item, count: 0 }),
        ),
      });
    }
  };

  const onChangePackage: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (!rentalTypes?.package) return;
    handleResetTime();

    const { checked, value } = e.currentTarget;

    if (checked) {
      const checkedItem = rentalTypes.package.find((item) => item.id === value);
      if (checkedItem) {
        let isFirstPackage = false;
        const { id, name, startAt, endAt, baseCost } = checkedItem;

        setReservationPackage((prev) => {
          if (prev.length === 0) isFirstPackage = true;
          return [...prev, { rentalTypeId: id, name, startAt, endAt, baseCost }];
        });

        setReservationAdditionalServices((prev) => {
          if (isFirstPackage) return { [id]: checkedItem.additionalServices.map((item) => ({ ...item, count: 0 })) };

          return {
            ...prev,
            [id]: checkedItem.additionalServices.map((item) => ({ ...item, count: 0 })),
          };
        });
      }
    } else {
      setReservationPackage((prev) => prev.filter((item) => item.rentalTypeId !== value));
      setReservationAdditionalServices((prev) => deletePropertyInObject(prev, value));
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
              onClick={handleResetTime}
              disabled={!isUnderTimeReservation(reservationTime)}
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
          <h2>패키지</h2>
          <menu className={styles.packageMenu}>
            {rentalTypes.package.map((item) => (
              <li key={item.id}>
                <PriceSelectMenuItem
                  price={item.baseCost}
                  value={item.id}
                  checked={Boolean(reservationPackage.find((packageItem) => packageItem.rentalTypeId === item.id))}
                  disabled={!item.isPossible}
                  name={item.name}
                  onChange={onChangePackage}
                  description={`${formatHourToAHHMM(item.startAt)}~${formatHourToAHHMM(item.endAt)}`}
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
