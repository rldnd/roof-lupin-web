"use client";

import cx from "clsx";

import type { Props as PriceInfoTableItemProps } from "./PriceInfoTableItem";

import PriceInfoTableItem from "./PriceInfoTableItem";

import styles from "./priceInfoTable.module.scss";

interface Props {
  items: PriceInfoTableItemProps[];
  totalTitle: string;
  totalDtClassName?: string;
  totalDdClassName?: string;
}

const PriceInfoTable: React.FC<Props> = ({ items, totalTitle, totalDtClassName, totalDdClassName }) => {
  const totalPrice = items.reduce((acc, cur) => {
    if (cur.isMinus) return acc - cur.price;
    return acc + cur.price;
  }, 0);

  return (
    <dl className={styles.wrapper}>
      {items.map((item) => (
        <PriceInfoTableItem
          key={`${item.title} - ${item.price}`}
          title={item.title}
          price={item.price}
          isMinus={item.isMinus}
          dtClassName={item.dtClassName}
          ddClassName={item.ddClassName}
        />
      ))}
      <PriceInfoTableItem
        key="totalPrice"
        title={totalTitle}
        price={totalPrice}
        ddClassName={cx(styles.totalDd, totalDdClassName)}
        dtClassName={cx(styles.totalDt, totalDtClassName)}
      />
    </dl>
  );
};

export default PriceInfoTable;
