"use client";

import { useId } from "react";

import { Checkbox } from "@/components";

import styles from "./priceSelectMenuItem.module.scss";

interface Props {
  checked: boolean;
  disabled: boolean;
  price: number;
  name: string;
  description?: string;
}

const PriceSelectMenuItem: React.FC<Props> = ({ checked, disabled, price, name, description }) => {
  const id = useId();

  return (
    <button type="button" aria-describedby={id} className={styles.wrapper} disabled={disabled}>
      <label htmlFor={id}>
        <Checkbox id={id} checked={checked} disabled={disabled} />
        <span className={styles.name}>
          {name}
          {description && <span className={styles.description}>{description}</span>}
        </span>
        <span className={styles.price}>{price.toLocaleString("ko-KR")}원</span>
      </label>
    </button>
  );
};

export default PriceSelectMenuItem;
