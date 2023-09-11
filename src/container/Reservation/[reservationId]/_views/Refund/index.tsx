"use client";

import type { ReservationDetail } from "@/common/types/reservation";

import { Info, PriceInfo, Responsive, SpaceInfo, Status } from "../../_shared";
import RefundPriceInfo from "../../_shared/RefundPriceInfo";

import styles from "./refundView.module.scss";

interface Props {
  reservation: ReservationDetail;
}

// TODO: 취소/환불 분기 처리
const RefundView: React.FC<Props> = ({ reservation }) => {
  return (
    <>
      <Status reservation={reservation} />
      <section className={styles.refundMessageWrapper}>
        <p className={styles.refundMessage}>환불은 주말 / 공휴일을 제외한 영업일 기준 3-5일 소요될 수 있습니다.</p>
      </section>
      <hr />
      <section className={styles.cancelWrapper}>
        <h2>취소 사유</h2>
        <p>{reservation.cancel?.reason}</p>
      </section>
      <hr />
      <SpaceInfo reservation={reservation} />
      <hr />
      <Info reservation={reservation} />
      <hr />
      <PriceInfo reservation={reservation} />
      <RefundPriceInfo reservation={reservation} className={styles.refundPriceInfo} />
      <Responsive />
    </>
  );
};
export default RefundView;
