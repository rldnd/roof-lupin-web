import { memo } from "react";

import cx from "clsx";

import styles from "./spacePrice.module.scss";

type Size = "medium" | "small";

interface Props {
  timeCost: number | null;
  packageCost: number | null;
  rows: 1 | 2;
  size?: Size;
}

type PriceOption = "Prefix" | "Cost" | "Suffix";

type PriceProps<T extends string> = {
  [K in T as `${T}${PriceOption}`]: string | number;
};

type TimePriceProps = PriceProps<"time"> & { size: Size };
type PackagePriceProps = PriceProps<"package"> & { size: Size };
type TwoLinePriceProps = TimePriceProps & PackagePriceProps & { size: Size };

const OneLineTimePrice: React.FC<TimePriceProps> = memo(({ timePrefix, timeCost, timeSuffix, size }) => {
  return (
    <span className={cx(styles.oneRowWrapper, styles[size])}>
      {timePrefix}
      <span>
        {timeCost.toLocaleString("ko-KR")}
        {timeSuffix}
      </span>
    </span>
  );
});

const OneLinePackagePrice: React.FC<PackagePriceProps> = memo(({ packageCost, packagePrefix, packageSuffix, size }) => {
  return (
    <span className={cx(styles.oneRowWrapper, styles[size])}>
      {packagePrefix}
      <span>
        {packageCost.toLocaleString("ko-KR")}
        {packageSuffix}
      </span>
    </span>
  );
});

const TwoLinePrice: React.FC<TwoLinePriceProps> = memo(
  ({ packageCost, packagePrefix, packageSuffix, timeCost, timePrefix, timeSuffix, size }) => {
    return (
      <div className={cx(styles.twoRowsWrapper, styles[size])}>
        <span className={styles.firstRow}>
          {timePrefix}
          <span>
            {timeCost.toLocaleString("ko-KR")}
            {timeSuffix}
          </span>
        </span>
        <span className={styles.secondRow}>
          {packagePrefix}
          <span>
            {packageCost.toLocaleString("ko-KR")}
            {packageSuffix}
          </span>
        </span>
      </div>
    );
  },
);

const SpacePrice: React.FC<Props> = ({ packageCost, timeCost, rows, size = "medium" }) => {
  const [hasTimeCost, hasPriceCost] = [timeCost !== null, packageCost !== null];
  const [timePrefix, timeSuffix] = ["1시간 /", "원"];
  const [packagePrefix, packageSuffix] = ["패키지 /", "원~"];

  if ((rows === 1 && hasTimeCost) || (rows === 2 && !hasPriceCost))
    return <OneLineTimePrice timePrefix={timePrefix} timeCost={timeCost!} timeSuffix={timeSuffix} size={size} />;

  if ((rows === 1 && !hasTimeCost) || (rows === 2 && !hasTimeCost))
    return (
      <OneLinePackagePrice
        packageCost={packageCost!}
        packagePrefix={packagePrefix}
        packageSuffix={packageSuffix}
        size={size}
      />
    );

  if (rows === 2 && hasTimeCost && hasPriceCost)
    return (
      <TwoLinePrice
        packageCost={packageCost!}
        packagePrefix={packagePrefix}
        packageSuffix={packageSuffix}
        timeCost={timeCost!}
        timePrefix={timePrefix}
        timeSuffix={timeSuffix}
        size={size}
      />
    );

  return null;
};

export default memo(SpacePrice);
