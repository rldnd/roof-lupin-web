"use client";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { ReservationDetail } from "@/common/types/reservation";
import { PriceInfoTable } from "@/components";
import type { Props as Item } from "@/components/Reservation/PriceInfoTable/PriceInfoTableItem";
import { dayjs } from "@/utils/date";
import { getRefundPrice } from "@/utils/refund";

import styles from "./refundPriceInfo.module.scss";

interface Props {
  className?: string;
  reservation: ReservationDetail;
}

const RefundPriceInfo: React.FC<Props> = ({ reservation, className }) => {
  const { isCanceled, cancel } = reservation;
  const totalPrice: Item = { title: "결제 금액", price: reservation.totalCost };

  const canceledAt = dayjs(cancel?.createdAt).format("YYYY.MM.DD (ddd) HH:mm");

  const refundPrice: Item = {
    title: "취소 수수료 발생",
    price: getRefundPrice(reservation),
    ddClassName: styles.refundPriceDd,
    isMinus: true,
  };

  const payMethod: Item = { title: "환불 수단", text: `${reservation.payMethod ?? ""} 환불` };
  const refundStatus: Item[] = isCanceled
    ? [{ title: "환불 상태", text: "환불 완료", ddClassName: styles.refundStatusDd }]
    : [];

  return (
    <section className={cx(styles.wrapper, className)}>
      <h2 className={styles.title}>취소/환불 정보</h2>
      {isCanceled && (
        <small className={styles.canceledAt}>
          취소일시
          <time className={styles.canceledAtDate} dateTime={canceledAt}>
            {canceledAt}
          </time>
        </small>
      )}
      <PriceInfoTable
        className={styles.table}
        items={[totalPrice, refundPrice]}
        totalTitle="최종 환불 예정 금액"
        totalDdClassName={styles.totalDd}
        bottomItems={[payMethod, ...refundStatus]}
      />
    </section>
  );
};

export default RefundPriceInfo;

export const LoadingRefundPriceInfo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <section className={cx(styles.wrapper, className)}>
      <h2 className={styles.title}>취소/환불 정보</h2>
      <Skeleton width="100%" height={150} />
    </section>
  );
};
