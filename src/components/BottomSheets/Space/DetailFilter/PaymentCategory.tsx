"use client";

import { type Dispatch, type MouseEventHandler, type SetStateAction } from "react";

import cx from "clsx";

import type { SpaceSortMenu } from "@/states";

import styles from "./paymentCategory.module.scss";

interface Props {
  isImmediateReservation: boolean | null;
  setLocalMenu: Dispatch<SetStateAction<SpaceSortMenu>>;
}

const PaymentCategory: React.FC<Props> = ({ isImmediateReservation, setLocalMenu }) => {
  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { value } = e.currentTarget;
    const checked = value === "true" ? true : false;
    setLocalMenu((prev) => ({
      ...prev,
      isImmediateReservation: prev.isImmediateReservation === checked ? null : checked,
    }));
  };

  return (
    <section className={styles.wrapper}>
      <h2>결제 유형</h2>
      <menu className={styles.list}>
        <li>
          <button
            type="button"
            value="false"
            onClick={onClick}
            className={cx(styles.checkButton, { [styles.active]: isImmediateReservation === false })}
          >
            승인 후 결제
          </button>
        </li>
        <li>
          <button
            type="button"
            value="true"
            onClick={onClick}
            className={cx(styles.checkButton, { [styles.active]: isImmediateReservation === true })}
          >
            바로 결제
          </button>
        </li>
      </menu>
    </section>
  );
};

export default PaymentCategory;
