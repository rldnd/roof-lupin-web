"use client";

import { useParams } from "next/navigation";

import type { ReservationDetail } from "@/common/types/reservation";
import { useSuspenseQuery } from "@/hooks";
import { getMyReservationApi } from "@/services/reservation";

import { LoadingInfo, LoadingSpaceInfo, LoadingStatus } from "./_shared";
import { ApprovedPendingView, ApprovedView, HostCanceledView } from "./_views";

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
    </>
  );
};

export default View;

export const LoadingView: React.FC = () => {
  return (
    <>
      <LoadingStatus />
      <LoadingSpaceInfo />
      <LoadingInfo />
    </>
  );
};
