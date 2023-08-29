"use client";

import { Fragment } from "react";

import { useParams } from "next/navigation";

import type { Reservation } from "@/common/types/reservation";
import { Button, DataItem, DataList } from "@/components";
import { LoadingDataItem } from "@/components/Data/DataItem";
import { useSuspenseQuery } from "@/hooks";
import { getMyReservationApi } from "@/services/reservation";
import { dayjs } from "@/utils/date";
import { isPackageRentalType, isTimeRentalType } from "@/utils/rentalType";
import { getDiffHour, getTimeWithDay } from "@/utils/time";

import styles from "./bottomSection.module.scss";

const BottomSection: React.FC = () => {
  const { reservationId } = useParams();
  const { data } = useSuspenseQuery<Reservation>(["getMyReservation", reservationId], () =>
    getMyReservationApi(reservationId),
  );

  const date = dayjs(`${data.year}-${data.month}-${data.day}`).format("YYYY년 MM월 DD일 (ddd)");
  const rentalTypes = data.rentalTypes.map((rentalType) => rentalType.rentalType);
  const additionalServices = rentalTypes.flatMap((rentalType) => rentalType.additionalServices);

  return (
    <section className={styles.wrapper}>
      <DataList>
        <DataItem label="날짜">
          <time dateTime={date}>{date}</time>
        </DataItem>
        <DataItem label="인원">{data.userCount}명</DataItem>
        <DataItem label="상품 및 부가서비스">
          {rentalTypes.map((rentalType) => (
            <Fragment key={rentalType.id}>
              {isTimeRentalType(rentalType) && (
                <>
                  시간 단위 예약 ({getTimeWithDay(rentalType.startAt)}-{getTimeWithDay(rentalType.endAt)},
                  {getDiffHour(rentalType.startAt, rentalType.endAt)}시간)
                </>
              )}
              {isPackageRentalType(rentalType) && (
                <>
                  {rentalType.name} ({rentalType.startAt}-{rentalType.endAt}시)
                </>
              )}
              {additionalServices.length > 0 && (
                <>
                  <br />
                  부가서비스: {additionalServices.map((item) => item.name).join(",")}
                </>
              )}
            </Fragment>
          ))}
        </DataItem>
        <DataItem label="결제 예정 금액">{data.totalCost.toLocaleString("ko-KR")}원</DataItem>
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
