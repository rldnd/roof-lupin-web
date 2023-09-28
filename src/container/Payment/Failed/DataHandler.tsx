import { useEffect } from "react";

import { useSetAtom } from "jotai";

import {
  initialReservation,
  initialReservationTime,
  reservationAdditionalServicesState,
  reservationCouponState,
  reservationDepositConfirmState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
} from "@/states";

const DataHandler: React.FC = () => {
  const setReservation = useSetAtom(reservationState);
  const setTime = useSetAtom(reservationTimeState);
  const setPackages = useSetAtom(reservationPackageState);
  const setAdditionalServices = useSetAtom(reservationAdditionalServicesState);
  const setDepositConfirm = useSetAtom(reservationDepositConfirmState);
  const setCoupon = useSetAtom(reservationCouponState);

  useEffect(() => {
    setAdditionalServices({});
    setTime(initialReservationTime);
    setPackages([]);
    setDepositConfirm(false);
    setReservation((prev) => ({ ...initialReservation, spaceId: prev.spaceId }));
    setCoupon([]);
  }, [setAdditionalServices, setCoupon, setDepositConfirm, setPackages, setReservation, setTime]);

  return null;
};

export default DataHandler;
