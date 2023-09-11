"use client";

import cx from "clsx";

import type { ReservationDetail } from "@/common/types/reservation";
import { PriceInfoTable } from "@/components";
import type { Props as Item } from "@/components/Reservation/PriceInfoTable/PriceInfoTableItem";

import styles from "./refundPriceInfo.module.scss";

interface Props {
  className?: string;
  reservation: ReservationDetail;
}

// TODO: refund price
const RefundPriceInfo: React.FC<Props> = ({ reservation, className }) => {
  const totalPrice: Item = { title: "결제 금액", price: reservation.totalCost };
  const refundPrice: Item = {
    title: "취소 수수료 발생",
    price: 5000,
    ddClassName: styles.refundPriceDd,
    isMinus: true,
  };

  const payMethod: Item = { title: "환불 수단", text: `${reservation.payMethod ?? ""} 환불` };

  return (
    <section className={cx(styles.wrapper, className)}>
      <h2 className={styles.title}>취소/환불 정보</h2>
      <PriceInfoTable
        items={[totalPrice, refundPrice]}
        totalTitle="최종 환불 예정 금액"
        totalDdClassName={styles.totalDd}
        bottomItems={[payMethod]}
      />
    </section>
  );
};

export default RefundPriceInfo;
