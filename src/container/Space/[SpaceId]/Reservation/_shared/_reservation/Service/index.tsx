"use client";

import { ChangeEventHandler } from "react";

import { useAtom, useAtomValue } from "jotai";

import { PriceSelectMenuItem } from "@/components";
import {
  reservationAdditionalServicesState,
  type ReservationPackage,
  reservationPackageState,
  ReservationTime,
  reservationTimeState,
} from "@/states/reservation";
import { formatHourToAHHMM } from "@/utils/date";

import styles from "./service.module.scss";

interface ReturnGetRentalTypeFromId {
  name: string;
  time: string;
}

const getRentalTypeFromId = (
  rentalTypeId: string,
  packages: ReservationPackage[],
  time: ReservationTime,
): ReturnGetRentalTypeFromId => {
  if (time.startAt && time.endAt)
    return {
      name: "시간 단위 상품",
      time: `${formatHourToAHHMM(time.startAt)}시 ~ ${formatHourToAHHMM(time.endAt)}시`,
    };

  const packageItem = packages.find((packageItem) => packageItem.rentalTypeId === rentalTypeId);
  if (!packageItem) return { name: "", time: "" };

  return {
    name: packageItem.name,
    time: `${formatHourToAHHMM(packageItem.startAt)}시 ~ ${formatHourToAHHMM(packageItem.endAt)}시`,
  };
};

const Service: React.FC = () => {
  const time = useAtomValue(reservationTimeState);
  const packages = useAtomValue(reservationPackageState);

  const [reservationAdditionalServices, setReservationAdditionalServices] = useAtom(reservationAdditionalServicesState);

  const hasTime = time.startAt && time.endAt;
  const hasPackage = packages.length > 0;

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, checked } = e.currentTarget;

    setReservationAdditionalServices((prev) =>
      Object.entries(prev).reduce(
        (acc, [id, services]) => ({
          ...acc,
          [id]: services.map((service) => (service.id === value ? { ...service, count: checked ? 1 : 0 } : service)),
        }),
        {},
      ),
    );
  };

  if (Object.values(reservationAdditionalServices).flatMap((services) => services).length === 0) return null;

  return (
    <>
      <section className={styles.wrapper}>
        <h2>부가 서비스</h2>
        <span className={styles.description}>
          {hasTime && "시간 단위 상품 사용 시 가능한 부가서비스 입니다."}
          {hasPackage &&
            `${packages.map((packageItem) => packageItem.name).join(", ")} 사용 시 가능한 부가서비스 입니다.`}
        </span>
        {Object.entries(reservationAdditionalServices).map(([rentalTypeId, services]) => (
          <div key={rentalTypeId} className={styles.listWrapper}>
            <h3>
              {getRentalTypeFromId(rentalTypeId, packages, time).name}
              <small>{getRentalTypeFromId(rentalTypeId, packages, time).time}</small>
            </h3>
            <menu className={styles.list}>
              {services.map((service) => (
                <li key={service.id}>
                  <PriceSelectMenuItem
                    checked={Boolean(service.count)}
                    name={service.name}
                    price={service.cost}
                    onChange={onChange}
                    value={service.id}
                  />
                </li>
              ))}
            </menu>
          </div>
        ))}
      </section>
      <hr className={styles.hr} />
    </>
  );
};

export default Service;
