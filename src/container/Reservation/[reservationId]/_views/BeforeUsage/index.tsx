"use client";

import type { ReservationDetail } from "@/common/types/reservation";
import { Button } from "@/components";

import { Info, PriceInfo, SpaceInfo, Status } from "../../_shared";

import styles from "./beforeUsageView.module.scss";

interface Props {
  reservation: ReservationDetail;
}

// TODO: refund policy
const BeforeUsageView: React.FC<Props> = ({ reservation }) => {
  return (
    <>
      <Status reservation={reservation} />
      <section className={styles.refundMessageWrapper}>
        <div className={styles.refundMessage}>까지는 총 금액의 100%를 환불해드려요.</div>
      </section>
      <SpaceInfo reservation={reservation} />
      <hr />
      <Info reservation={reservation} />
      <hr />
      <PriceInfo reservation={reservation} />
      <hr />
      <section className={styles.refundWrapper}>
        <h2>환불 규정</h2>
        <p>2023년 9월 12일까지 수수료 없이 취소가 가능합니다. 9월 13일 이후로는 부분 환불이 가능합니다.</p>
        <button type="button">취소 및 환불 규정</button>
      </section>
      <hr />
      <section className={styles.cancelWrapper}>
        <Button type="button" color="secondary" full>
          예약 취소
        </Button>
      </section>
    </>
  );
};

export default BeforeUsageView;
