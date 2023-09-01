"use client";

import { Fragment } from "react";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { ReservationDetail } from "@/common/types/reservation";
import { DataItem, DataList } from "@/components";
import { LoadingDataItem } from "@/components/Data/DataItem";
import { dayjs } from "@/utils/date";
import { isPackageRentalType, isTimeRentalType } from "@/utils/rentalType";
import { getDiffHour, getTimeWithDay } from "@/utils/time";

import styles from "./spaceInfo.module.scss";

interface Props {
  className?: string;
  reservation: ReservationDetail;
}

const SpaceInfo: React.FC<Props> = ({ reservation, className }) => {
  const { space, year, month, day, userCount, additionalServices, rentalTypes } = reservation;

  const date = dayjs(`${year}-${month}-${day}`).format("YYYY년 MM월 DD일 (ddd)");

  return (
    <section className={cx(styles.wrapper, className)}>
      <article className={styles.space}>
        <img src={space.thumbnail} className={styles.thumbnail} alt="공간 이미지" />
        <em className={styles.name}>{space.title}</em>
        {space.location && (
          <small className={styles.address}>{space.location?.roadAddress ?? space.location.jibunAddress}</small>
        )}
      </article>
      <DataList>
        <DataItem label="날짜" dtClassName={cx(styles.label, styles.firstItem)}>
          <time dateTime={date}>{date}</time>
        </DataItem>
        <DataItem label="인원" dtClassName={styles.label}>
          {userCount}명
        </DataItem>
        <DataItem label="상품 및 부가서비스" dtClassName={styles.label}>
          {rentalTypes.map((item) => {
            const { startAt, endAt, rentalType, rentalTypeId } = item;
            return (
              <Fragment key={rentalTypeId}>
                {isTimeRentalType(rentalType) && (
                  <>
                    시간 단위 예약 ({getTimeWithDay(startAt)}-{getTimeWithDay(endAt + 1)},
                    {getDiffHour(startAt, endAt + 1)}시간)
                  </>
                )}
                {isPackageRentalType(rentalType) && (
                  <>
                    {rentalType.name} ({startAt}-{endAt}시)
                  </>
                )}
                {additionalServices.length > 0 && (
                  <>
                    <br />
                    부가서비스: {additionalServices.map((item) => item.name).join(",")}
                  </>
                )}
              </Fragment>
            );
          })}
        </DataItem>
      </DataList>
    </section>
  );
};

export default SpaceInfo;

export const LoadingSpaceInfo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <section className={cx(styles.wrapper, className)}>
      <Skeleton className={styles.space} height={72} />
      <DataList>
        <LoadingDataItem dtClassName={cx(styles.label, styles.firstItem)} />
        <LoadingDataItem dtClassName={styles.label} />
        <LoadingDataItem dtClassName={styles.label} />
      </DataList>
    </section>
  );
};
