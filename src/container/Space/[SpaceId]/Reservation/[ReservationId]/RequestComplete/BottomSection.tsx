"use client";

import { useParams } from "next/navigation";

import type { ReservationDetail } from "@/common/types/reservation";
import { Button, DataItem, DataList } from "@/components";
import { LoadingDataItem } from "@/components/Data/DataItem";
import { useSuspenseQuery } from "@/hooks";
import { getMyReservationApi } from "@/services/reservation";
import { dayjs } from "@/utils/date";

import styles from "./bottomSection.module.scss";

const BottomSection: React.FC = () => {
  const { reservationId } = useParams();
  const { data } = useSuspenseQuery<ReservationDetail>(["getMyReservation", reservationId], () =>
    getMyReservationApi(reservationId),
  );

  const date = dayjs(`${data.year}-${data.month}-${data.day}`).format("YYYY년 MM월 DD일 (ddd)");

  return (
    <section className={styles.wrapper}>
      <DataList>
        <DataItem label="날짜">
          <time dateTime={date}>{date}</time>
        </DataItem>
        <DataItem label="인원">~~명</DataItem>
        <DataItem label="상품 및 부가서비스">확인 필요</DataItem>
      </DataList>
      <Button type="button" color="secondary" full>
        예약 신청 내역 바로가기
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
        예약 신청 내역 바로가기
      </Button>
    </section>
  );
};
