import { Fragment } from "react";

import type { RefundPolicy } from "@/common/types/refund";

import styles from "./refund.module.scss";

interface Props {
  refundPolicies: RefundPolicy[];
}

const Refund: React.FC<Props> = ({ refundPolicies }) => {
  return (
    <section id="refund-section" className={styles.wrapper}>
      <h2>취소 및 환불 정책</h2>
      <p>
        {[...refundPolicies]
          .sort((a, b) => b.daysBefore - a.daysBefore)
          .map((policy) => (
            <Fragment key={policy.id}>
              {policy.daysBefore === 0 ? "이용 당일" : `예약일 기준 ${policy.daysBefore}일 전`}{" "}
              {policy.refundRate === 0 ? "환불불가" : `${policy.refundRate}% 환불`}
              <br />
            </Fragment>
          ))}
        {`\n결제 후 2시간 내 취소할 경우 취소 수수료가 발생하지 않아요. (단, 사용시간 경과 후 제외)`}
      </p>
    </section>
  );
};

export default Refund;
