"use client";

import { memo } from "react";

import cx from "clsx";
import { range } from "lodash-es";

import { IconStar, IconStarEmpty } from "public/icons";

import styles from "./starRating.module.scss";

interface Props {
  score: number;
  className?: string;
}

const StarRating: React.FC<Props> = ({ score, className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      {range(5).map((value) => {
        const s = value + 1;
        if (score >= s) return <IconStar key={s} />;
        else return <IconStarEmpty key={s} />;
      })}
    </div>
  );
};

export default memo(StarRating);
