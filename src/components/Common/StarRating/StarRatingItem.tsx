import { CSSProperties, memo, useMemo } from "react";

import cx from "clsx";

import { IconStar } from "public/icons";

import styles from "./starRatingItem.module.scss";

interface Props {
  className?: string;
  viewReviewCount: boolean;
  score: number;
  reviewCount: number;
  starSize?: number;
}

const StarRatingItem: React.FC<Props> = ({ className, viewReviewCount, score, reviewCount, starSize = 18 }) => {
  const style = useMemo(() => ({ "--scale": starSize / 18 } as CSSProperties), [starSize]);

  return (
    <div className={cx(styles.wrapper, className)} style={style}>
      <IconStar />
      <span className={styles.score}>{reviewCount === 0 ? "리뷰 없음" : score.toFixed(1)}</span>
      {viewReviewCount && reviewCount !== 0 && <span className={styles.reviewCount}>({reviewCount})</span>}
    </div>
  );
};

export default memo(StarRatingItem);
