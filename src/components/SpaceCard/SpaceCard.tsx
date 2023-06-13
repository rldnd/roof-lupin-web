import { memo, Suspense } from "react";

import Image from "next/image";
import Link from "next/link";

import cx from "clsx";

import { FULL_STAR } from "@/common/constants/common";
import type { Space } from "@/common/types/space";

import Bookmark from "./Bookmark";
import BestTag from "../BestTag";

import styles from "./spaceCard.module.scss";

interface Props {
  className?: string;
  space: Space;
  href: string;
}

const SpaceCard: React.FC<Props> = ({ className, space, href }) => {
  const hasTimeCost = space.timeCost !== null;
  const [pricePrefix, priceSuffix, price] = [
    hasTimeCost ? "1시간" : "패키지",
    hasTimeCost ? "원" : "원~",
    hasTimeCost ? space.timeCost! : space.packageCost!,
  ];

  return (
    <li className={cx(styles.wrapper, className)}>
      <div className={styles.imageWrapper}>
        <Link href={href}>
          <Image src={space.thumbnail} fill alt={`${space.title} 공간 이미지`} />
        </Link>
        <Suspense fallback={null}>
          <Bookmark space={space} />
        </Suspense>
      </div>

      <Link href={href} className={styles.content}>
        {space.publicTransportation && <span className={styles.transport}>{space.publicTransportation.name}</span>}
        <p className={styles.title}>{space.title}</p>
        <div className={styles.info}>
          <div className={styles.rating}>
            <span className={styles.star}>{FULL_STAR}</span>
            <span className={styles.score}>{space.averageScore}</span>
            <span className={styles.reviewCount}>({space.reviewCount})</span>
          </div>
          <span className={styles.price}>
            {pricePrefix} /
            <span>
              {price.toLocaleString("ko-KR")}
              {priceSuffix}
            </span>
          </span>
        </div>
        {space.isBest && <BestTag top="0" left="8px" />}
      </Link>
    </li>
  );
};

export default memo(SpaceCard);
