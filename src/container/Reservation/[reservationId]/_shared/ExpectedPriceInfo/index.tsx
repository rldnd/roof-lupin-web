"use client";

import { useMemo } from "react";

import cx from "clsx";

import type { ReservationDetail } from "@/common/types/reservation";
import { PriceInfoTable } from "@/components";
import type { Props as Item } from "@/components/Reservation/PriceInfoTable/PriceInfoTableItem";
import { isTimeRentalType } from "@/utils/rentalType";
import { getDiffHour } from "@/utils/time";

import styles from "./expectedPriceInfo.module.scss";

interface Props {
  className?: string;
  reservation: ReservationDetail;
}

const ExpectedPriceInfo: React.FC<Props> = ({ reservation, className }) => {
  const { discountCost, totalCost, userCount, space, additionalServices } = reservation;

  const timePrice = useMemo<Item[]>(() => {
    if (reservation.rentalTypes.length !== 1 || !isTimeRentalType(reservation.rentalTypes[0].rentalType)) return [];
    const { rentalType: time, startAt, endAt } = reservation.rentalTypes[0];
    const price = time.timeCostInfos.reduce<number>((acc, cur) => {
      if (cur.time >= startAt && cur.time <= endAt) return acc + cur.cost;
      return acc;
    }, 0);

    return [{ title: `시간 단위 예약 (${getDiffHour(startAt, endAt + 1)}시간)`, price }];
  }, [reservation.rentalTypes]);

  const additionalServicesPrice = useMemo<Item[]>(() => {
    return additionalServices.map((service) => ({ title: service.name, price: service.cost * service.count }));
  }, [additionalServices]);

  return (
    <section className={cx(styles.wrapper, className)}>
      <h2 className={styles.title}>결제 예정 금액</h2>
      <PriceInfoTable totalTitle="결제 금액" items={[...timePrice, ...additionalServicesPrice]} />
    </section>
  );
};

export default ExpectedPriceInfo;

export const LoadingExpectedPriceInfo: React.FC<{ className?: string }> = ({ className }) => {
  return null;
};
