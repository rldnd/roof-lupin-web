"use client";

import { Suspense } from "react";

import { useAtomValue } from "jotai";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { ToastPositioner } from "@/components";
import { RESERVATION_TAB_MAPPER, reservationTabState } from "@/states/reservation";

import DataHandler from "./DataHandler";
import PaymentTab from "./PaymentTab";
import RequestPaymentTab from "./RequestPaymentTab";
import RequestReservationTab from "./RequestReservationTab";
import ReservationTab from "./ReservationTab";

const SpaceReservationContainer: React.FC = () => {
  const tab = useAtomValue(reservationTabState);

  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      {tab === RESERVATION_TAB_MAPPER.RESERVATION && <ReservationTab />}
      {tab === RESERVATION_TAB_MAPPER.REQUEST_RESERVATION && <RequestReservationTab />}
      {tab === RESERVATION_TAB_MAPPER.PAYMENT && <PaymentTab />}
      {tab === RESERVATION_TAB_MAPPER.REQUEST_PAYMENT && <RequestPaymentTab />}
      <Suspense fallback={null}>
        <DataHandler />
      </Suspense>
    </ToastPositioner>
  );
};

export default SpaceReservationContainer;
