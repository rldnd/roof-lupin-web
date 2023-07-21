"use client";

import { useAtomValue } from "jotai";

import { reservationTabState } from "@/states/reservation";

import ReservationTab from "./ReservationTab";

const SpaceReservationContainer: React.FC = () => {
  const tab = useAtomValue(reservationTabState);

  return <>{tab === "reservation" && <ReservationTab />}</>;
};

export default SpaceReservationContainer;
