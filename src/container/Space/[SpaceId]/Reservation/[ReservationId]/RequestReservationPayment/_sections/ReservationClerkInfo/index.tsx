"use client";

import type { ReservationDetail } from "@/common/types/reservation";
import { DataItem, DataList } from "@/components";
import { getPhoneNumberWithHyphen } from "@/utils/regex";

import styles from "./reservationClerkInfo.module.scss";

interface Props {
  reservation: ReservationDetail;
}

const ReservationClerkInfo: React.FC<Props> = ({ reservation }) => {
  return (
    <section className={styles.wrapper}>
      <h2>예약자 정보</h2>
      <DataList>
        <DataItem label="이름">{reservation.userName}</DataItem>
        <DataItem label="전화번호">{getPhoneNumberWithHyphen(reservation.userPhoneNumber)}</DataItem>
      </DataList>
    </section>
  );
};

export default ReservationClerkInfo;
