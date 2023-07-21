"use client";

import { ChangeEventHandler } from "react";

import { useAtom } from "jotai";

import { PriceSelectMenuItem } from "@/components";
import { reservationAdditionalServicesState } from "@/states/reservation";

import styles from "./service.module.scss";

const Service: React.FC = () => {
  const [reservationAdditionalServices, setReservationAdditionalServices] = useAtom(reservationAdditionalServicesState);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value, checked } = e.currentTarget;

    setReservationAdditionalServices((prev) =>
      Object.entries(prev).reduce(
        (acc, [id, services]) => ({
          ...acc,
          [id]: services.map((service) => (service.id === value ? { ...service, count: checked } : service)),
        }),
        {},
      ),
    );
  };

  if (Object.values(reservationAdditionalServices).flatMap((services) => services).length === 0) return <></>;

  return (
    <>
      <section className={styles.wrapper}>
        <h2>부가 서비스</h2>
        <span className={styles.description}>상품 이용 조건을 잘 확인해주세요!</span>
        <menu className={styles.list}>
          {Object.entries(reservationAdditionalServices).map(([id, services]) =>
            services.map((service) => (
              <li key={service.id}>
                <PriceSelectMenuItem
                  checked={Boolean(service.count)}
                  name={service.name}
                  price={service.cost}
                  onChange={onChange}
                  value={service.id}
                />
              </li>
            )),
          )}
        </menu>
      </section>
      <hr />
    </>
  );
};

export default Service;
