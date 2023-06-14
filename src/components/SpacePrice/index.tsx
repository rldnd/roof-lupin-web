import { memo } from "react";

import styles from "./spacePrice.module.scss";

interface Props {
  timeCost: number | null;
  packageCost: number | null;
  rows: 1 | 2;
}

type PriceOption = "Prefix" | "Cost" | "Suffix";

type PriceProps<T extends string> = {
  [K in T as `${T}${PriceOption}`]: string | number;
};

type TimePriceProps = PriceProps<"time">;
type PackagePriceProps = PriceProps<"package">;
type TwoLinePriceProps = TimePriceProps & PackagePriceProps;

const OneLineTimePrice: React.FC<TimePriceProps> = memo(({ timePrefix, timeCost, timeSuffix }) => {
  return (
    <span className={styles.oneRowWrapper}>
      {timePrefix}
      <span>
        {timeCost.toLocaleString("ko-KR")}
        {timeSuffix}
      </span>
    </span>
  );
});

const OneLinePackagePrice: React.FC<PackagePriceProps> = memo(({ packageCost, packagePrefix, packageSuffix }) => {
  return (
    <span className={styles.oneRowWrapper}>
      {packagePrefix}
      <span>
        {packageCost.toLocaleString("ko-KR")}
        {packageSuffix}
      </span>
    </span>
  );
});

const TwoLinePrice: React.FC<TwoLinePriceProps> = memo(
  ({ packageCost, packagePrefix, packageSuffix, timeCost, timePrefix, timeSuffix }) => {
    return (
      <div className={styles.twoRowsWrapper}>
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

const SpacePrice: React.FC<Props> = ({ packageCost, timeCost, rows }) => {
  const [hasTimeCost, hasPriceCost] = [timeCost !== null, packageCost !== null];
  const [timePrefix, timeSuffix] = ["1시간 /", "원"];
  const [packagePrefix, packageSuffix] = ["패키지 /", "원~"];

  if ((rows === 1 && hasTimeCost) || (rows === 2 && !hasPriceCost))
    return <OneLineTimePrice timePrefix={timePrefix} timeCost={timeCost!} timeSuffix={timeSuffix} />;

  if ((rows === 1 && !hasTimeCost) || (rows === 2 && !hasTimeCost))
    return (
      <OneLinePackagePrice packageCost={packageCost!} packagePrefix={packagePrefix} packageSuffix={packageSuffix} />
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
      />
    );

  return null;
};

export default memo(SpacePrice);
