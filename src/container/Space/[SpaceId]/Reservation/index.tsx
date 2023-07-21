"use client";

import { useState } from "react";

import ReservationTab from "./ReservationTab";

type Tab = "reservation" | "payment";

const SpaceReservationContainer: React.FC = () => {
  const [tab, setTab] = useState<Tab>("reservation");

  return <>{tab === "reservation" && <ReservationTab />}</>;
};

export default SpaceReservationContainer;
