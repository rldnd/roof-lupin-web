"use client";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";
import Skeleton from "react-loading-skeleton";

import type { RentalType } from "@/common/types/rentalType";
import { useSuspenseQuery } from "@/hooks";
import { getSpaceRentalTypeApi } from "@/services/rentalType";
import { spaceReservationInfoState } from "@/states";
import { dayjs } from "@/utils/date";
import { isPackageRentalType, isTimeRentalType } from "@/utils/rentalType";

import styles from "./info.module.scss";

const Info: React.FC = () => {
  const { spaceId } = useParams();
  const { year, month, day, userCount } = useAtomValue(spaceReservationInfoState);
  const date = dayjs(`${year}-${month}-${day}`).format("MM월 DD일 ddd");

  const { data: rentalTypes } = useSuspenseQuery<RentalType[]>(["getSpaceRentalType", spaceId, year, month, day], () =>
    getSpaceRentalTypeApi({ spaceId, year, month, day }),
  );

  const time = rentalTypes.find(isTimeRentalType);
  const packages = rentalTypes.filter(isPackageRentalType);

  if (!time && packages.length === 0) return null;

  return (
    <section className={styles.wrapper}>
      <span className={styles.text}>
        <time dateTime={date} className={styles.info}>
          {date}요일
        </time>
        <span className={styles.info}>, {userCount}인 기준</span>
        가격이에요.
      </span>
      <br />
      <span className={styles.text}>상세 요금은 요일, 공휴일, 시간대, 인원에 따라 달라져요.</span>
    </section>
  );
};

export default Info;

export const LoadingInfo: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <Skeleton width={200} />
      <br />
      <Skeleton width={250} style={{ marginTop: "4px" }} />
    </section>
  );
};
