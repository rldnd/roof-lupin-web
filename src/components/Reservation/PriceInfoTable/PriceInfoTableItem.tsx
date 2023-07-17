"use client";

import cx from "clsx";

import styles from "./priceInfoTableItem.module.scss";

export interface Props {
  title: string;
  price: number;
  dtClassName?: string;
  ddClassName?: string;
}

const PriceInfoTableItem: React.FC<Props> = ({ title, price, ddClassName, dtClassName }) => {
  return (
    <>
      <dt className={cx(styles.dt, dtClassName)}>{title}</dt>
      <dd className={cx(styles.dd, ddClassName)}>{price.toLocaleString("ko-KR")}원</dd>
    </>
  );
};

export default PriceInfoTableItem;
