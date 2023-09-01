"use client";

import { Suspense } from "react";

import { useParams } from "next/navigation";

import type { ReservationDetail } from "@/common/types/reservation";
import { useSuspenseQuery } from "@/hooks";
import { getMyReservationApi } from "@/services/reservation";

import {
  ExpectedPriceInfo,
  Info,
  LoadingExpectedPriceInfo,
  LoadingInfo,
  LoadingPriceInfo,
  LoadingSpaceInfo,
  LoadingStatus,
  PriceInfo,
  SpaceInfo,
  Status,
} from "./_shared";

// TODO: status에 따른 view 분기
const View: React.FC = () => {
  const { reservationId } = useParams();
  const { data: reservation } = useSuspenseQuery<ReservationDetail>(["getMyReservation", reservationId], () =>
    getMyReservationApi(reservationId),
  );

  return (
    <>
      <Suspense fallback={<LoadingStatus />}>
        <Status reservation={reservation} />
      </Suspense>
      <Suspense fallback={<LoadingSpaceInfo />}>
        <SpaceInfo reservation={reservation} />
      </Suspense>
      <Suspense fallback={<LoadingInfo />}>
        <Info reservation={reservation} />
      </Suspense>
      <Suspense fallback={<LoadingExpectedPriceInfo />}>
        <ExpectedPriceInfo reservation={reservation} />
      </Suspense>
      <Suspense fallback={<LoadingPriceInfo />}>
        <PriceInfo reservation={reservation} />
      </Suspense>
      <LoadingPriceInfo />
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
