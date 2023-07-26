import Image from "next/image";
import Link from "next/link";

import cx from "clsx";

import type { Space } from "@/common/types/space";
import { StarRatingItem } from "@/components/Common/StarRating";
import { getNumberFromPixel } from "@/utils/styles";

import { SpacePrice } from "..";

import styles from "./spaceRankCard.module.scss";

interface Props {
  className?: string;
  space: Space;
  rank: number;
  href: string;
}

const SpaceRankCard: React.FC<Props> = ({ rank, space, className, href }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <div className={styles.imageWrapper}>
        <Link href={href}>
          <Image
            width={getNumberFromPixel(styles.imageWidth)}
            height={getNumberFromPixel(styles.imageHeight)}
            alt="공간 이미지"
            src={space.thumbnail}
          />
          <span className={styles.rank}>{rank}</span>
        </Link>
      </div>
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

export default SpaceRankCard;
