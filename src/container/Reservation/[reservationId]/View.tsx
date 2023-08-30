"use client";

import { Suspense } from "react";

import { useParams } from "next/navigation";

import type { ReservationDetail } from "@/common/types/reservation";
import { useSuspenseQuery } from "@/hooks";
import { getMyReservationApi } from "@/services/reservation";

import { ReservationStatus } from "./_shared";
import { LoadingReservationStatus } from "./_shared/ReservationStatus";

// TODO: status에 따른 view 분기
const View: React.FC = () => {
  const { reservationId } = useParams();
  const { data: reservation } = useSuspenseQuery<ReservationDetail>(["getMyReservation", reservationId], () =>
    getMyReservationApi(reservationId),
  );

  return (
    <Suspense fallback={<LoadingReservationStatus />}>
      <ReservationStatus reservation={reservation} />
    </Suspense>
  );
};

export default View;

export const LoadingView: React.FC = () => {
  return null;
};
