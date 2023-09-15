"use client";

import { useState } from "react";

import type { ReservationDetail } from "@/common/types/reservation";
import { RefundPolicyBottomSheet } from "@/components/BottomSheets/Reservation";
import { dayjs } from "@/utils/date";
import { getRefundPolicySectionText } from "@/utils/refund";

import styles from "./freeCancelTerm.module.scss";

interface Props {
  reservation: ReservationDetail;
}

const FreeCancelTerm: React.FC<Props> = ({ reservation }) => {
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);
  const { year, month, day, space } = reservation;

  const text = getRefundPolicySectionText(space.refundPolicies, dayjs(`${year}-${month}-${day}`));

  return (
    <>
      <section className={styles.wrapper}>
        <h2>환불 규정</h2>
        <p>{text}</p>
        <button type="button" onClick={() => setIsShowBottomSheet(true)}>
          취소 및 환불 규정
        </button>
      </section>
      <RefundPolicyBottomSheet
        isShow={isShowBottomSheet}
        onClose={() => setIsShowBottomSheet(false)}
        refundPolicies={space.refundPolicies}
      />
    </>
  );
};

export default FreeCancelTerm;
