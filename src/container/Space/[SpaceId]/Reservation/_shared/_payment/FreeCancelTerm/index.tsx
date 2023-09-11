"use client";

import { useState } from "react";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";
import Skeleton from "react-loading-skeleton";

import type { SpaceDetail } from "@/common/types/space";
import { RefundPolicyBottomSheet } from "@/components/BottomSheets/Reservation";
import { useSuspenseQuery } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";
import { reservationState } from "@/states";
import { dayjs } from "@/utils/date";
import { getRefundPolicySectionText } from "@/utils/refund";

import styles from "./freeCancelTerm.module.scss";

const FreeCancelTerm: React.FC = () => {
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  const { spaceId } = useParams();
  const { data: space } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));
  const { year, month, day } = useAtomValue(reservationState);

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

export const LoadingFreeCancelTerm: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>환불 규정</h2>
      <Skeleton width={150} />
      <Skeleton width={60} />
    </section>
  );
};
