"use client";

import { Fragment } from "react";

import type { ReservationDetail } from "@/common/types/reservation";
import { DataItem, DataList } from "@/components";
import { dayjs } from "@/utils/date";
import { isPackageRentalType, isTimeRentalType } from "@/utils/rentalType";
import { getDiffHour, getTimeWithDay } from "@/utils/time";

import styles from "./selectedReservationInfo.module.scss";

interface Props {
  reservation: ReservationDetail;
}

const SelectedReservationInfo: React.FC<Props> = ({ reservation }) => {
  const date = dayjs(`${reservation.year}-${reservation.month}-${reservation.day}`).format("YYYY년 MM월 DD일 (ddd)");

  return (
    <>
      <h1 className={styles.title}>{reservation.space.title}</h1>
      <section className={styles.wrapper}>
        <DataList>
          <DataItem label="날짜">
            <time dateTime={date}>{date}</time>
          </DataItem>
          <DataItem label="인원">{reservation.userCount}명</DataItem>
          <DataItem label="상품 및 부가서비스">
            {reservation.rentalTypes.map((item) => {
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
                  {reservation.additionalServices.length > 0 && (
                    <>
                      <br />
                      부가서비스: {reservation.additionalServices.map((item) => item.name).join(",")}
                    </>
                  )}
                </Fragment>
              );
            })}
          </DataItem>
        </DataList>
      </section>
    </>
  );
};

export default SelectedReservationInfo;
