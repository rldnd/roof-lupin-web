"use client";

import { useAtomValue } from "jotai";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { ToastPositioner } from "@/components";
import { reservationTabState } from "@/states/reservation";

import RequestReservationTab from "./RequestReservationTab";
import ReservationTab from "./ReservationTab";

const SpaceReservationContainer: React.FC = () => {
  const tab = useAtomValue(reservationTabState);

  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      {tab === "reservation" && <ReservationTab />}
      {tab === "requestReservation" && <RequestReservationTab />}
    </ToastPositioner>
  );
};

export default SpaceReservationContainer;
