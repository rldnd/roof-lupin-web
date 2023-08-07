"use client";

import { useAtomValue } from "jotai";

import { RESERVATION_TAB_MAPPER, reservationTabState } from "@/states";

import { PaymentTab, RequestPaymentTab, RequestReservationTab, ReservationTab } from "./_tabs";

const View: React.FC = () => {
  const tab = useAtomValue(reservationTabState);

  return (
    <>
      {tab === RESERVATION_TAB_MAPPER.RESERVATION && <ReservationTab />}
      {tab === RESERVATION_TAB_MAPPER.REQUEST_RESERVATION && <RequestReservationTab />}
      {tab === RESERVATION_TAB_MAPPER.PAYMENT && <PaymentTab />}
      {tab === RESERVATION_TAB_MAPPER.REQUEST_PAYMENT && <RequestPaymentTab />}
    </>
  );
};

export default View;
