import { memo } from "react";

import Image from "next/image";
import Link from "next/link";

import cx from "clsx";

import { FULL_STAR } from "@/common/constants/common";
import type { Space } from "@/common/types/space";

import BestTag from "../BestTag";

import styles from "./spaceCard.module.scss";

interface Props {
  className?: string;
  space: Space;
  href: string;
}

const SpaceCard: React.FC<Props> = ({ className, space, href }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <Link href={href}>
        <div className={styles.imageWrapper}>
          <Image src={space.thumbnail} fill alt={`${space.title} 공간 이미지`} />
        </div>

        <div className={styles.content}>
          {space.publicTransportation && <span className={styles.transport}>{space.publicTransportation.name}</span>}
          <p className={styles.title}>{space.title}</p>
          <div className={styles.info}>
            <div className={styles.rating}>
              <span className={styles.star}>{FULL_STAR}</span>
              <span className={styles.score}>{space.averageScore}</span>
              <span className={styles.reviewCount}>({space.reviewCount})</span>
            </div>
            <span className={styles.price}>
              1시간 /<span>{space.cost.toLocaleString("ko-KR")}원</span>
            </span>
          </div>
        </div>
        {space.isBest && <BestTag top="0" left="8px" />}
      </Link>
    </li>
  );
};

export default memo(SpaceCard);
