import { memo } from "react";

import Image from "next/image";
import Link from "next/link";

import cx from "clsx";

import type { Space } from "@/common/types/space";
import { BestTag, SpacePrice } from "@/components";

import Bookmark from "./Bookmark";
import { StarRatingItem } from "../Common/StarRating";

import styles from "./spaceCard.module.scss";

interface Props {
  className?: string;
  space: Space;
  href: string;
}

const SpaceCard: React.FC<Props> = ({ className, space, href }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <div className={styles.imageWrapper}>
        <Link href={href}>
          <Image src={space.thumbnail} fill alt={`${space.title} 공간 이미지`} />
        </Link>
      </div>
      <Bookmark space={space} />

      <Link href={href} className={styles.content}>
        {space.publicTransportation && <span className={styles.transport}>{space.publicTransportation.name}</span>}
        <p className={styles.title}>{space.title}</p>
        <div className={styles.info}>
          <StarRatingItem score={space.averageScore} reviewCount={space.reviewCount} viewReviewCount />
          <SpacePrice packageCost={space.packageCost} timeCost={space.timeCost} rows={1} />
        </div>
        {space.isBest && <BestTag top="0" left="8px" />}
      </Link>
    </li>
  );
};

export default memo(SpaceCard);
