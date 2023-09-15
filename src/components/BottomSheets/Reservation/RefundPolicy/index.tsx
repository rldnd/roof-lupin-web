"use client";

import { Fragment } from "react";

import type { RefundPolicy } from "@/common/types/refund";
import { BaseBottomSheet } from "@/components/Common";

import styles from "./refundPolicyBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  refundPolicies: RefundPolicy[];
  onClose(): void;
}

const RefundPolicyBottomSheet: React.FC<Props> = ({ isShow, onClose, refundPolicies }) => {
  return (
    <BaseBottomSheet
      isShow={isShow}
      onClose={onClose}
      blockWindowScroll
      isHeightMax
      title="취소 및 환불 규정"
      className={styles.wrapper}
    >
      <p>
        {`예약일 기준 8일 전 : 100% 환불\n`}
        {[...refundPolicies]
          .sort((a, b) => b.daysBefore - a.daysBefore)
          .map((policy) => (
            <Fragment key={policy.id}>
              예약일 {policy.daysBefore === 0 ? "당일" : `${policy.daysBefore}일 전`} {policy.refundRate}% 환불
              <br />
            </Fragment>
          ))}
        {`\n결제 후 2시간 내 취소할 경우 취소 수수료가 발생하지 않아요. (단, 사용시간 경과 후 제외)`}
      </p>
    </BaseBottomSheet>
  );
};

export default RefundPolicyBottomSheet;
