"use client";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";
import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import type { PossibleRentalTypes } from "@/common/types/rentalType";
import { LoadingReservationTimePicker, ReservationTimePicker } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { getSpaceRentalTypePossibleApi } from "@/services/rentalType";
import { spaceReservationInfoState } from "@/states";
import { formatHourToAHHMM } from "@/utils/date";

import styles from "./timeAndPackage.module.scss";

const TimeAndPackage: React.FC = () => {
  const { spaceId } = useParams();
  const { year, month, day } = useAtomValue(spaceReservationInfoState);
  const { data: rentalTypes } = useSuspenseQuery<PossibleRentalTypes>(
    ["getSpaceRentalTypePossible", spaceId, year, month, day],
    () => getSpaceRentalTypePossibleApi({ spaceId, year, month, day }),
  );

  return (
    <>
      {rentalTypes.time && (
        <section className={styles.wrapper}>
          <div className={styles.timeTitleWrapper}>
            <h2>
              시간 단위<small>최소 {rentalTypes.time.baseHour}시간 부터</small>
            </h2>
            <span className={styles.minPrice}>{rentalTypes.time.baseCost.toLocaleString("ko-KR")}원 부터</span>
          </div>
          <ReservationTimePicker
            infos={rentalTypes.time.timeCostInfos}
            className={styles.timePicker}
            startAt={null}
            endAt={null}
          />
        </section>
      )}
      {rentalTypes.package.length > 0 && (
        <section className={styles.wrapper}>
          <h2 className={styles.packageTitle}>패키지</h2>
          <ul className={styles.list}>
            {rentalTypes.package.map((item) => (
              <li key={item.id} className={styles.packageItem}>
                <div className={styles.info}>
                  <span className={styles.name}>{item.name}</span>
                  <span className={styles.description}>{`${formatHourToAHHMM(item.startAt)}시~${formatHourToAHHMM(
                    item.endAt,
                  )}시`}</span>
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
