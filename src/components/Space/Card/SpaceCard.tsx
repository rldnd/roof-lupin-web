import { memo, ReactNode } from "react";

import Link from "next/link";

import cx from "clsx";

import type { Space } from "@/common/types/space";
import { SpacePrice } from "@/components";
import { StarRatingItem } from "@/components/Common/StarRating";

import styles from "./spaceCard.module.scss";

interface Props {
  className?: string;
  space: Space;
  href: string;
  children?: ReactNode;
}

/** children => bookmark component */
const SpaceCard: React.FC<Props> = ({ className, space, href, children }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <Link href={href} className={styles.imageWrapper}>
        <img src={space.thumbnail} alt={`${space.title} 공간 이미지`} />
      </Link>
      {children}
      <Link href={href} className={styles.content}>
        {space.publicTransportations.length > 0 && (
          <span className={styles.transport}>{space.publicTransportations[0].name}</span>
        )}
        <p className={styles.title}>{space.title}</p>
        <div className={styles.info}>
          <StarRatingItem score={space.averageScore} reviewCount={space.reviewCount} viewReviewCount />
          <SpacePrice packageCost={space.packageCost} timeCost={space.timeCost} rows={1} />
        </div>
      </Link>
    </li>
  );
};

export default memo(SpaceCard);
