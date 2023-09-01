"use client";

import { useMemo } from "react";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { ReservationDetail } from "@/common/types/reservation";
import { Button, PriceInfoTable } from "@/components";
import type { Props as Item } from "@/components/Reservation/PriceInfoTable/PriceInfoTableItem";
import { dayjs } from "@/utils/date";
import { isPackageRentalType, isTimeRentalType } from "@/utils/rentalType";
import { getAdditionalUserPrice } from "@/utils/reservation";
import { getDiffHour } from "@/utils/time";

import styles from "./priceInfo.module.scss";

interface Props {
  className?: string;
  reservation: ReservationDetail;
}

const PriceInfo: React.FC<Props> = ({ reservation, className }) => {
  const { discountCost, userCount, space, additionalServices, payedAt, payMethod } = reservation;
  const date = dayjs(payedAt).format("YYYY.MM.DD (ddd) HH:mm");

  const timePrice = useMemo<Item[]>(() => {
    if (reservation.rentalTypes.length !== 1 || !isTimeRentalType(reservation.rentalTypes[0].rentalType)) return [];
    const { rentalType: time, startAt, endAt } = reservation.rentalTypes[0];
    const price = time.timeCostInfos.reduce<number>((acc, cur) => {
      if (cur.time >= startAt && cur.time <= endAt) return acc + cur.cost;
      return acc;
    }, 0);

    return [{ title: `시간 단위 예약 (${getDiffHour(startAt, endAt + 1)}시간)`, price }];
  }, [reservation.rentalTypes]);

  const packagePrice = useMemo<Item[]>(() => {
    const packages = reservation.rentalTypes.filter((rentalType) => isPackageRentalType(rentalType.rentalType));
    if (packages.length === 0) return [];

    return packages.map((item) => ({ title: item.rentalType.name, price: item.rentalType.baseCost }));
  }, [reservation.rentalTypes]);

  const additionalServicesPrice = useMemo<Item[]>(() => {
    return additionalServices.map((service) => ({ title: service.name, price: service.cost * service.count }));
  }, [additionalServices]);

  const additionalUserPrice = useMemo<Item[]>(() => {
    const { overflowUserCost, overflowUserCount } = space;
    const price = getAdditionalUserPrice(userCount, overflowUserCost, overflowUserCount);
    return [{ title: "인원 추가 금액", price }];
  }, [space, userCount]);

  const couponPrice = useMemo<Item[]>(
    () => [{ title: "쿠폰 할인", price: discountCost, isMinus: true, ddClassName: styles.couponPrice }],
    [discountCost],
  );

  return (
    <section className={cx(styles.wrapper, className)}>
      <h2 className={styles.title}>결제 정보</h2>
      <span className={styles.dateInfo}>
        결제일시<time dateTime={date}>{date}</time>
      </span>
      <PriceInfoTable
        totalTitle="결제 금액"
        items={[...timePrice, ...packagePrice, ...additionalServicesPrice, ...additionalUserPrice, ...couponPrice]}
        bottomItems={[{ title: "결제수단", text: payMethod ?? "" }]}
      />
      <Button color="bw" full type="button" className={styles.receiptButton}>
        영수증 조회
      </Button>
    </section>
  );
};

export default PriceInfo;

export const LoadingPriceInfo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <section className={cx(styles.wrapper, className)}>
      <h2 className={styles.title}>결제 정보</h2>
      <Skeleton width={120} height={24} className={styles.dateInfo} />
      <Skeleton width="100%" height={150} />
    </section>
  );
};
