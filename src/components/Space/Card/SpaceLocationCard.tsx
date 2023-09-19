"use client";

import Link from "next/link";

import cx from "clsx";

import type { Space } from "@/common/types/space";
import { Tag } from "@/components/Common";
import { StarRatingItem } from "@/components/Common/StarRating";

import { SpacePrice } from "..";

import styles from "./spaceLocationCard.module.scss";

interface Props {
  className?: string;
  space: Space;
}

const SpaceLocationCard: React.FC<Props> = ({ className, space }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <Link href={`/spaces/${space.id}`} className={styles.anchor}>
        <img src={space.thumbnail} alt="공간 이미지" className={styles.image} />
        <div className={styles.content}>
          <div className={styles.categoryWrapper}>
            {space.categories.map((category) => (
              <Tag size="small" color="secondary" className={styles.category} key={category.id}>
                {category.name}
              </Tag>
            ))}
          </div>
          <h2 className={styles.title}>{space.title}</h2>
          <StarRatingItem reviewCount={space.reviewCount} score={space.averageScore} viewReviewCount size="small" />
          <SpacePrice
            packageCost={space.packageCost}
            rows={1}
            timeCost={space.timeCost}
            size="small"
            className={styles.priceInfo}
          />
        </div>
      </Link>
    </li>
  );
};

export default SpaceLocationCard;
