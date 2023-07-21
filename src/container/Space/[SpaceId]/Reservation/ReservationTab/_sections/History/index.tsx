"use client";

import { useMemo } from "react";

import { useAtomValue } from "jotai";

import { PriceInfoTable } from "@/components";
import type { Props as Item } from "@/components/Reservation/PriceInfoTable/PriceInfoTableItem";
import {
  reservationAdditionalServicesState,
  reservationPackageState,
  reservationTimeState,
} from "@/states/reservation";

import styles from "./history.module.scss";

const ITEMS = [
  {
    title: "인원 추가 금액",
    price: 0,
  },
];

const History: React.FC = () => {
  const reservationTime = useAtomValue(reservationTimeState);
  const reservationPackage = useAtomValue(reservationPackageState);
  const reservationAdditionalServices = useAtomValue(reservationAdditionalServicesState);

  const timeHistory = useMemo<Item[]>(() => {
    const { cost, startAt, endAt } = reservationTime;
    if (!endAt || !startAt || !cost) return [];
    const diffTime = endAt <= 9 ? 24 - startAt + endAt : endAt - startAt;
    return [{ title: `시간 단위 예약 (${diffTime}시간)`, price: cost }];
  }, [reservationTime]);

  const packageHistory = useMemo<Item[]>(() => {
    if (reservationPackage.length === 0) return [];
    return reservationPackage.map((item) => ({ title: item.name, price: item.baseCost }));
  }, [reservationPackage]);

  const additionalServicesHistory = useMemo<Item[]>(() => {
    return Object.values(reservationAdditionalServices)
      .flatMap((services) => services.filter((service) => service.count === 1))
      .map((service) => ({ title: service.name, price: service.cost }));
  }, [reservationAdditionalServices]);

  return (
    <section className={styles.wrapper}>
      <h2>예약 내역</h2>
      <span className={styles.description}>쿠폰 등 혜택이 적용되지 않은 금액이에요.</span>
      <div className={styles.remainNotice}>선택한 내용은 이전 화면으로 돌아가도 20분간 유지됩니다.</div>
      <PriceInfoTable
        items={[...timeHistory, ...packageHistory, ...additionalServicesHistory, ...ITEMS]}
        totalTitle="총 예상 결제 금액"
      />
    </section>
  );
};

export default History;
