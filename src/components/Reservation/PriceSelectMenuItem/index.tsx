"use client";

import { ChangeEventHandler, useId } from "react";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import { Checkbox } from "@/components";

import styles from "./priceSelectMenuItem.module.scss";

interface Props {
  checked: boolean;
  disabled?: boolean;
  price: number;
  name: string;
  value: string;
  description?: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

const PriceSelectMenuItem: React.FC<Props> = ({ checked, disabled, price, name, description, onChange, value }) => {
  const id = useId();

  return (
    <button type="button" aria-describedby={id} className={styles.wrapper} disabled={disabled}>
      <label htmlFor={id}>
        <Checkbox id={id} checked={checked} disabled={disabled} onChange={onChange} value={value} />
        <div className={styles.info}>
          <span className={styles.name}>{name}</span>
          {description && <span className={styles.description}>{description}</span>}
        </div>
        <span className={styles.price}>{price.toLocaleString("ko-KR")}원</span>
      </label>
    </button>
  );
};

export default PriceSelectMenuItem;

export const LoadingPriceSelectMenuItem: React.FC<{ className?: string }> = ({ className }) => {
  return <Skeleton className={cx(styles.loading, className)} />;
};
