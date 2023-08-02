import { memo } from "react";

import Link from "next/link";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { Space } from "@/common/types/space";
import { StarRatingItem } from "@/components/Common/StarRating";

import { SpacePrice } from "..";

import styles from "./spaceRankCard.module.scss";

interface Props {
  className?: string;
  space: Space;
  rank?: number;
  href: string;
}

const SpaceRankCard: React.FC<Props> = ({ rank, space, className, href }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <Link href={href} className={styles.imageWrapper}>
        <img alt="공간 이미지" src={space.thumbnail} />
        {rank && <span className={styles.rank}>{rank}</span>}
      </Link>
      <div className={styles.content}>
        <Link href={href}>
          <small className={styles.address}>
            {space.publicTransportations.length > 0 && (
              <span className={styles.transport}>{space.publicTransportations[0].name}</span>
            )}
          </small>
          <p className={styles.title}>{space.title}</p>
          <StarRatingItem
            score={space.averageScore}
            reviewCount={space.reviewCount}
            viewReviewCount
            className={styles.starRating}
            size="small"
          />
          <SpacePrice packageCost={space.packageCost} timeCost={space.timeCost} rows={1} size="small" />
        </Link>
      </div>
    </li>
  );
};

export default memo(SpaceRankCard);

export const LoadingSpaceRankCard: React.FC = () => {
  return (
    <li className={styles.wrapper}>
      <Skeleton className={styles.imageWrapper} />
      <div className={styles.content}>
        <Skeleton className={styles.address} width={80} height={12} />
        <Skeleton className={styles.title} width={120} />
        <Skeleton className={styles.starRating} width={60} />
        <Skeleton width={100} />
      </div>
    </li>
  );
};
