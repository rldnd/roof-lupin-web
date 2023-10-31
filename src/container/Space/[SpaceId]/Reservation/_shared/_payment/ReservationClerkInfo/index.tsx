"use client";

import { useEffect } from "react";

import { useSetAtom } from "jotai";

import { Button, DataItem, DataList } from "@/components";
import { useIamport } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { reservationState } from "@/states";
import { getPhoneNumberWithHyphen } from "@/utils/regex";

import styles from "./reservationClerkInfo.module.scss";

const ReservationClerkInfo: React.FC = () => {
  const { me } = useMe();
  const setReservation = useSetAtom(reservationState);
  const { requestCertificate } = useIamport();

  useEffect(() => {
    if (!me) return;
    if (me.isCertified && me.setting.isAdult)
      setReservation((prev) => ({ ...prev, userName: me.name, userPhoneNumber: me.phoneNumber }));
    else setReservation((prev) => ({ ...prev, userName: null, userPhoneNumber: null }));
  }, [me, setReservation]);

  return (
    <section className={styles.wrapper}>
      <h2>예약자 정보</h2>
      {me?.isCertified && me.setting.isAdult && (
        <DataList>
          <DataItem label="이름">{me.name}</DataItem>
          <DataItem label="전화번호">{getPhoneNumberWithHyphen(me?.phoneNumber ?? "")}</DataItem>
        </DataList>
      )}
      {(!me?.isCertified || !me?.setting.isAdult) && (
        <Button color="secondary" full onClick={requestCertificate}>
          최초 1회 본인인증하기
        </Button>
      )}
    </section>
  );
};

export default ReservationClerkInfo;
