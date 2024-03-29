"use client";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";
import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import type { RentalType } from "@/common/types/rentalType";
import { LoadingReservationTimePicker, ReservationTimePicker } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { getSpaceRentalTypeApi } from "@/services/rentalType";
import { spaceReservationInfoState } from "@/states";
import { isPackageRentalType, isTimeRentalType } from "@/utils/rentalType";
import { formatHourToAHHMM } from "@/utils/time";

import Empty from "./Empty";

import styles from "./timeAndPackage.module.scss";

const TimeAndPackage: React.FC = () => {
  const { spaceId } = useParams();
  const { year, month, day } = useAtomValue(spaceReservationInfoState);
  const { data: rentalTypes } = useSuspenseQuery<RentalType[]>(["getSpaceRentalType", spaceId, year, month, day], () =>
    getSpaceRentalTypeApi({ spaceId, year, month, day }),
  );

  const time = rentalTypes.find(isTimeRentalType);
  const packages = rentalTypes.filter(isPackageRentalType);

  if (!time && packages.length === 0) return <Empty isShow />;

  return (
    <>
      {time && (
        <section className={styles.wrapper}>
          <div className={styles.timeTitleWrapper}>
            <h2>
              시간 단위<small>최소 {time.baseHour}시간 부터</small>
            </h2>
            <span className={styles.minPrice}>{time.baseCost.toLocaleString("ko-KR")}원 부터</span>
          </div>
          <ReservationTimePicker infos={time.timeCostInfos} className={styles.timePicker} startAt={null} endAt={null} />
        </section>
      )}
      {packages.length > 0 && (
        <section className={styles.wrapper}>
          <h2 className={styles.packageTitle}>패키지</h2>
          <ul className={styles.list}>
            {packages.map((item) => (
              <li key={item.id} className={styles.packageItem}>
                <div className={styles.info}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.description}>{`${formatHourToAHHMM(item.startAt)}~${formatHourToAHHMM(
                    item.endAt,
                  )}`}</span>
                </div>
                <span className={styles.price}>{item.baseCost.toLocaleString("ko-KR")}원</span>
              </li>
            ))}
          </ul>
        </section>
      )}
    </>
  );
};

export default TimeAndPackage;

export const LoadingTimeAndPackage: React.FC = () => {
  return (
    <>
      <section className={styles.wrapper}>
        <div className={styles.timeTitleWrapper}>
          <h2>시간 단위</h2>
          <Skeleton width={80} className={styles.minPrice} />
        </div>
        <LoadingReservationTimePicker />
      </section>
      <section className={styles.wrapper}>
        <h2 className={styles.packageTitle}>패키지</h2>
        <ul className={styles.list}>
          {range(3).map((value) => (
            <li key={value} className={styles.loadingPackageItem}>
              <Skeleton height={65} containerClassName={styles.loadingPackageItem} key={value} />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
};
