"use client";

import { useAtom, useSetAtom } from "jotai";
import { useUnmount } from "react-use";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { ToastPositioner } from "@/components";
import {
  initialReservation,
  initialReservationTime,
  reservationAdditionalServicesState,
  reservationDepositConfirmState,
  reservationPackageState,
  reservationState,
  reservationTabState,
  reservationTimeState,
} from "@/states/reservation";

import RequestReservationTab from "./RequestReservationTab";
import ReservationTab from "./ReservationTab";

const SpaceReservationContainer: React.FC = () => {
  const [tab, setTab] = useAtom(reservationTabState);

  const setReservation = useSetAtom(reservationState);
  const setAdditionalServices = useSetAtom(reservationAdditionalServicesState);
  const setTime = useSetAtom(reservationTimeState);
  const setPackage = useSetAtom(reservationPackageState);
  const setDepositConfirm = useSetAtom(reservationDepositConfirmState);

  useUnmount(() => {
    setTab("reservation");
    setAdditionalServices({});
    setTime(initialReservationTime);
    setPackage([]);
    setDepositConfirm(false);
    setReservation(initialReservation);
  });

  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      {tab === "reservation" && <ReservationTab />}
      {tab === "requestReservation" && <RequestReservationTab />}
    </ToastPositioner>
  );
};

export default SpaceReservationContainer;
