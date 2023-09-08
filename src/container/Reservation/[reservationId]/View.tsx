"use client";

import { useParams } from "next/navigation";

import type { ReservationDetail } from "@/common/types/reservation";
import { useSuspenseQuery } from "@/hooks";
import { getMyReservationApi } from "@/services/reservation";

import { LoadingInfo, LoadingSpaceInfo, LoadingStatus } from "./_shared";
import { ApprovedPendingView, ApprovedView, BeforeUsageView, HostCanceledView, RefundView, UsedView } from "./_views";

import styles from "./view.module.scss";

const View: React.FC = () => {
  const { reservationId } = useParams();
  const { data: reservation } = useSuspenseQuery<ReservationDetail>(["getMyReservation", reservationId], () =>
    getMyReservationApi(reservationId),
  );

  return (
    <>
      {reservation.status === "APPROVED_PENDING" && <ApprovedPendingView reservation={reservation} />}
      {reservation.status === "APPROVED" && <ApprovedView reservation={reservation} />}
      {reservation.status === "HOST_CANCELED" && <HostCanceledView reservation={reservation} />}
      {reservation.status === "BEFORE_USAGE" && <BeforeUsageView reservation={reservation} />}
      {reservation.status === "USED" && <UsedView reservation={reservation} />}
      {reservation.status === "REFUND" && <RefundView reservation={reservation} />}
    </>
  );
};

export default View;

export const LoadingView: React.FC = () => {
  return (
    <>
      <LoadingStatus />
      <LoadingSpaceInfo className={styles.spaceInfo} />
      <hr />
      <LoadingInfo />
    </>
  );
};
