"use client";

import { useMemo } from "react";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";

import type { SpaceDetail } from "@/common/types/space";
import { PriceInfoTable } from "@/components";
import type { Props as Item } from "@/components/Reservation/PriceInfoTable/PriceInfoTableItem";
import { useSuspenseQuery } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";
import {
  reservationAdditionalServicesState,
  reservationPackageState,
  reservationState,
  reservationTimeState,
} from "@/states/reservation";
import { isUnderTimeReservation } from "@/utils/rentalType";
import { getAdditionalUserPrice } from "@/utils/reservation";
import { getDiffHour } from "@/utils/time";

import styles from "./history.module.scss";

const ADDITIONAL_USER_TITLE = "인원 추가 금액";

const History: React.FC = () => {
  const { spaceId } = useParams();
  const { data: space } = useSuspenseQuery<SpaceDetail>(["getClientSpace", spaceId], () => getClientSpaceApi(spaceId));

  const reservation = useAtomValue(reservationState);
  const reservationTime = useAtomValue(reservationTimeState);
  const reservationPackage = useAtomValue(reservationPackageState);
  const reservationAdditionalServices = useAtomValue(reservationAdditionalServicesState);

  const timeHistory = useMemo<Item[]>(() => {
    if (!isUnderTimeReservation(reservationTime)) return [];
    const { startAt, endAt, cost } = reservationTime;
    return [{ title: `시간 단위 예약 (${getDiffHour(startAt, endAt)}시간)`, price: cost }];
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

  const additionalUserPrice = useMemo<Item[]>(() => {
    const { userCount } = reservation;
    const { overflowUserCost, overflowUserCount } = space;
    const price = getAdditionalUserPrice(userCount, overflowUserCost, overflowUserCount);
    return [{ title: ADDITIONAL_USER_TITLE, price }];
  }, [reservation, space]);

  return (
    <section className={styles.wrapper}>
      <h2>예약 내역</h2>
      <span className={styles.description}>쿠폰 등 혜택이 적용되지 않은 금액이에요.</span>
      <div className={styles.remainNotice}>선택한 내용은 이전 화면으로 돌아가도 20분간 유지됩니다.</div>
      <PriceInfoTable
        items={[...timeHistory, ...packageHistory, ...additionalServicesHistory, ...additionalUserPrice]}
        totalTitle="총 예상 결제 금액"
      />
    </section>
  );
};

export default History;
