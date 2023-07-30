"use client";

import { ChangeEventHandler } from "react";

import { useAtom } from "jotai";

import { UnderlinedInput } from "@/components";
import { reservationState } from "@/states/reservation";

import styles from "./reservationClerkInfo.module.scss";

const ReservationClerkInfo: React.FC = () => {
  const [reservation, setReservation] = useAtom(reservationState);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { name, value } = e.currentTarget;
    setReservation((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <section className={styles.wrapper}>
      <h2>예약자 정보</h2>
      <UnderlinedInput
        label="성명"
        className={styles.input}
        name="userName"
        value={reservation.userName ?? ""}
        placeholder="예약자 성명을 입력해주세요"
        onChange={onChange}
      />
      <UnderlinedInput
        label="전화번호"
        className={styles.input}
        name="userPhoneNumber"
        placeholder="예약자 전화번호를 입력해주세요"
        value={reservation.userPhoneNumber ?? ""}
        onChange={onChange}
      />
    </section>
  );
};

export default ReservationClerkInfo;
