"use client";

import { type ChangeEventHandler, type Dispatch, type SetStateAction, useState } from "react";

import { isBoolean } from "lodash-es";

import HorizonDraggable from "@/components/HorizonDraggable";
import type { CategorySortMenu } from "@/states";

import styles from "./paymentCategory.module.scss";

interface Props {
  isImmediateReservation: boolean | null;
  setLocalMenu: Dispatch<SetStateAction<CategorySortMenu>>;
}

const PaymentCategory: React.FC<Props> = ({ isImmediateReservation, setLocalMenu }) => {
  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
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
      <HorizonDraggable component="menu" className={styles.list}>
        <li>
          <label className={styles.checkButton}>
            승인 후 결제
            <input
              type="checkbox"
              value="false"
              hidden
              checked={isBoolean(isImmediateReservation) && !isImmediateReservation}
              onChange={onChange}
            />
          </label>
        </li>
        <li>
          <label className={styles.checkButton}>
            바로 결제
            <input
              type="checkbox"
              value="true"
              hidden
              checked={isBoolean(isImmediateReservation) && isImmediateReservation}
              onChange={onChange}
            />
          </label>
        </li>
      </HorizonDraggable>
    </section>
  );
};

export default PaymentCategory;
