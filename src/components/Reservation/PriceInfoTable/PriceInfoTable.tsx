"use client";

import cx from "clsx";

import type { Props as PriceInfoTableItemProps } from "./PriceInfoTableItem";

import PriceInfoTableItem from "./PriceInfoTableItem";

import styles from "./priceInfoTable.module.scss";

interface Props {
  items: PriceInfoTableItemProps[];
  bottomItems?: PriceInfoTableItemProps[];
  totalTitle: string;
  totalDtClassName?: string;
  totalDdClassName?: string;
  className?: string;
}

const PriceInfoTable: React.FC<Props> = ({
  items,
  totalTitle,
  className,
  totalDtClassName,
  totalDdClassName,
  bottomItems = [],
}) => {
  const totalPrice = items.reduce((acc, cur) => {
    if (typeof cur.price !== "number") return acc;
    if (cur.isMinus) return acc - cur.price;
    return acc + cur.price;
  }, 0);

  return (
    <dl className={cx(styles.wrapper, className)}>
      {items.map((item) => (
        <PriceInfoTableItem
          key={`${item.title} - ${item.price}`}
          {...item}
          ddClassName={cx(item.ddClassName, styles.dd)}
          dtClassName={cx(item.dtClassName, styles.dt)}
        />
      ))}
      <PriceInfoTableItem
        key="totalPrice"
        title={totalTitle}
        price={totalPrice}
        ddClassName={cx(styles.totalDd, totalDdClassName)}
        dtClassName={cx(styles.totalDt, totalDtClassName)}
      />
      {bottomItems.length > 0 &&
        bottomItems.map((item) => (
          <PriceInfoTableItem
            key={`${item.title} - ${item.price}`}
            {...item}
            ddClassName={cx(item.ddClassName, styles.bottomDd)}
            dtClassName={cx(item.dtClassName, styles.bottomDt)}
          />
        ))}
    </dl>
  );
};

export default PriceInfoTable;
