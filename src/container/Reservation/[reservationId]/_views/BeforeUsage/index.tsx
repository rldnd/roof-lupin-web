"use client";

import Link from "next/link";

import type { ReservationDetail } from "@/common/types/reservation";
import { Button } from "@/components";
import { dayjs } from "@/utils/date";
import { getRefundAllDate, getRefundPolicySectionText } from "@/utils/refund";

import { Info, PriceInfo, SpaceInfo, Status } from "../../_shared";

import styles from "./beforeUsageView.module.scss";

interface Props {
  reservation: ReservationDetail;
}

const BeforeUsageView: React.FC<Props> = ({ reservation }) => {
  const { year, month, day } = reservation;
  const refundAllDate = getRefundAllDate(reservation.space.refundPolicies, dayjs(`${year}-${month}-${day}`));
  const refundMessage = refundAllDate
    ? `${refundAllDate.month() + 1}월 ${refundAllDate.date()}일까지는`
    : "결제 후 2시간 이내에는";

  return (
    <>
      <Status reservation={reservation} />
      <section className={styles.refundMessageWrapper}>
        <div className={styles.refundMessage}>{refundMessage} 총 금액의 100%를 환불해드려요.</div>
      </section>
      <SpaceInfo reservation={reservation} />
      <hr />
      <Info reservation={reservation} />
      <hr />
      <PriceInfo reservation={reservation} />
      <hr />
      <section className={styles.refundWrapper}>
        <h2>환불 규정</h2>
        <p>{getRefundPolicySectionText(reservation.space.refundPolicies, dayjs(`${year}-${month}-${day}`))}</p>
        <button type="button">취소 및 환불 규정</button>
      </section>
      <hr />
      <section className={styles.cancelWrapper}>
        <Link href={`/reservations/${reservation.id}/refund`}>
          <Button type="button" color="secondary" full>
            예약 취소
          </Button>
        </Link>
      </section>
    </>
  );
};

export default BeforeUsageView;
