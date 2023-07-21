"use client";

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
import { reservationState } from "@/states/reservation";
import { formatHourToAHHMM } from "@/utils/date";

import styles from "./timeAndPackage.module.scss";

// TODO: enabled에서 isLogined 제외하고, 추후 errorBoundary로 대체
const TimeAndPackage: React.FC = () => {
  const { spaceId } = useParams();
  const { isLogined } = useMe();

  const [reservation, setReservation] = useAtom(reservationState);
  const { year, month, day } = reservation;

  const { data: rentalTypes } = useSuspenseQuery<PossibleRentalTypes>(
    ["getSpaceRentalTypePossible", year, month, day],
    () => getSpaceRentalTypePossibleApi({ spaceId, year: year!, month: month!, day: day! }),
    {
      enabled: Boolean(year) && Boolean(month) && Boolean(day) && isLogined,
      onSuccess: (data) => {
        if (!data.time && data.package.length === 0) throw Error("예약 가능한 날짜가 아닙니다.");
      },
    },
  );

  if (!year || !month || !day) return <LoadingTimeAndPackage />;

  return (
    <section className={styles.wrapper}>
      {rentalTypes?.time && (
        <>
          <div className={styles.titleWrapper}>
            <h2>
              시간 단위<small>최소 {rentalTypes?.time?.baseHour}시간 부터</small>
            </h2>
            <button type="button" className={styles.reset}>
              초기화
            </button>
          </div>
          <ReservationTimePicker infos={rentalTypes.time?.timeCostInfos} className={styles.timePicker} />
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
                  checked={true}
                  disabled={false}
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
