"use client";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";
import Skeleton from "react-loading-skeleton";

import { ReservationDetail } from "@/common/types/reservation";
import { useSuspenseQuery } from "@/hooks";
import { getMyReservationApi } from "@/services/reservation";
import { paymentRefundState } from "@/states";

import {
  Info,
  LoadingInfo,
  LoadingPriceInfo,
  LoadingSpaceInfo,
  LoadingStatus,
  PriceInfo,
  Responsive,
  SpaceInfo,
  Status,
} from "../../_shared";
import RefundPriceInfo from "../../_shared/RefundPriceInfo";

import styles from "./view.module.scss";

// TODO: 취소/환불 분기 처리
const RefundView: React.FC = () => {
  const { cancelReason } = useAtomValue(paymentRefundState);
  const { reservationId } = useParams();
  const { data: reservation } = useSuspenseQuery<ReservationDetail>(["getMyReservation"], () =>
    getMyReservationApi(reservationId),
  );

  return (
    <>
      <Status reservation={reservation} isRefunding />
      <section className={styles.refundMessageWrapper}>
        <p className={styles.refundMessage}>환불은 주말 / 공휴일을 제외한 영업일 기준 3-5일 소요될 수 있습니다.</p>
      </section>
      <hr />
      <section className={styles.cancelWrapper}>
        <h2>취소 사유</h2>
        <p>{cancelReason}</p>
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

export const LoadingView: React.FC = () => {
  return (
    <>
      <LoadingStatus />
      <section className={styles.refundMessageWrapper}>
        <p className={styles.refundMessage}>환불은 주말 / 공휴일을 제외한 영업일 기준 3-5일 소요될 수 있습니다.</p>
      </section>
      <hr />
      <section className={styles.cancelWrapper}>
        <h2>취소 사유</h2>
        <Skeleton width={100} />
      </section>
      <hr />
      <LoadingSpaceInfo />
      <hr />
      <LoadingInfo />
      <hr />
      <LoadingPriceInfo />
      <Responsive />
    </>
  );
};
