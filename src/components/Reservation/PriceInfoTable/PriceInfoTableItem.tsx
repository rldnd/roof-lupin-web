"use client";

import cx from "clsx";

import styles from "./priceInfoTableItem.module.scss";

export interface Props {
  title: string;
  price?: number;
  text?: string;
  isMinus?: boolean;
  dtClassName?: string;
  ddClassName?: string;
}

const PriceInfoTableItem: React.FC<Props> = ({ title, price, ddClassName, dtClassName, isMinus = false, text }) => {
  return (
    <>
      <dt className={cx(styles.dt, dtClassName)}>{title}</dt>
      <dd className={cx(styles.dd, ddClassName)}>
        {isMinus && Boolean(price) && "-"}
        {typeof price === "number" && <>{price.toLocaleString("ko-KR")}원</>}
        {text}
      </dd>
    </>
  );
};

export default PriceInfoTableItem;
