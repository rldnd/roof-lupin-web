"use client";

import { useEffect } from "react";

import { notFound, useSearchParams } from "next/navigation";

import { useSetAtom } from "jotai";

import { reservationState } from "@/states/reservation";

// TODO: space reservation info 에서 time / package 정보도 포함시키기
const DataHandler: React.FC = () => {
  const setReservation = useSetAtom(reservationState);
  const searchParams = useSearchParams();

  const year = searchParams.get("year");
  const month = searchParams.get("month");
  const day = searchParams.get("day");
  const userCount = searchParams.get("userCount");

  useEffect(() => {
    if (!year || !month || !day || !userCount) notFound();
    setReservation((prev) => ({ ...prev, year, month, day, userCount: Number(userCount) }));
  }, [year, month, day, userCount, setReservation]);

  return null;
};

export default DataHandler;
