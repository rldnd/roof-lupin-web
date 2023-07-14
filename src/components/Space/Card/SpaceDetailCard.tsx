import { memo, ReactNode } from "react";

import Image from "next/image";
import Link from "next/link";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { Space } from "@/common/types/space";
import { SpacePrice } from "@/components";
import { StarRatingItem } from "@/components/Common/StarRating";

import styles from "./spaceDetailCard.module.scss";

interface Props {
  className?: string;
  space: Space;
  href: string;
  children: ReactNode;
}

/** children => bookmark component */
const SpaceDetailCard: React.FC<Props> = ({ className, space, href, children }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <div className={styles.imageWrapper}>
        <Link href={href}>
          <Image
            src={space.thumbnail}
            fill
            alt={`${space.title} 공간 이미지`}
            sizes="(min-width: 60em) 24vw,(min-width: 28em) 45vw,100vw"
          />
        </Link>
      </div>
      {children}

      <Link href={href} className={styles.content}>
        {space.publicTransportations.length > 0 && (
          <span className={styles.transport}>
            {space.publicTransportations[0].name} 도보 {space.publicTransportations[0].timeTaken}분
          </span>
        )}
        <p className={styles.title}>{space.title}</p>
        <div className={styles.info}>
          <StarRatingItem score={space.averageScore} reviewCount={space.reviewCount} viewReviewCount />
          <SpacePrice packageCost={space.packageCost} timeCost={space.timeCost} rows={2} />
        </div>
      </Link>
    </li>
  );
};

export default memo(SpaceDetailCard);

export const LoadingSpaceDetailCard: React.FC<{ className?: string }> = memo(({ className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <Skeleton containerClassName={styles.imageWrapper} height="100%" />
      <div className={styles.content}>
        <Skeleton containerClassName={styles.transport} width={120} />
        <Skeleton containerClassName={styles.title} width={150} />
        <div className={styles.info}>
          <Skeleton width={60} />
          <div className={styles.loadingPrice}>
            <Skeleton width={80} />
            <Skeleton width={120} />
          </div>
        </div>
      </div>
    </div>
  );
});
