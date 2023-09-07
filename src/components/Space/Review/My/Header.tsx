"use client";

import Link from "next/link";

import Skeleton from "react-loading-skeleton";

import type { Review } from "@/common/types/review";
import { StarRating } from "@/components/Common/StarRating";
import { formatYYMMDD } from "@/utils/date";

import { IconGrayRightChevronSmall, IconThreeDotsLarge } from "public/icons";

import styles from "./header.module.scss";

interface Props {
  review: Review;
}

const Header: React.FC<Props> = ({ review }) => {
  const { space } = review;
  const createdAt = formatYYMMDD(review.createdAt);

  return (
    <div className={styles.wrapper}>
      <Link className={styles.spaceTitle} href={`/spaces/${space.id}`}>
        {space.title}
        <button type="button">
          <IconGrayRightChevronSmall />
        </button>
      </Link>
      <button type="button" aria-label="리뷰 설정" className={styles.settings}>
        <IconThreeDotsLarge />
      </button>
      <div className={styles.info}>
        <StarRating score={review.score} />
        <time dateTime={createdAt} className={styles.createdAt}>
          {createdAt}
        </time>
      </div>
    </div>
  );
};

export default Header;

export const LoadingHeader: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Skeleton className={styles.spaceTitle} width={100} />
      <button type="button" className={styles.settings}>
        <IconThreeDotsLarge />
      </button>
      <div className={styles.info}>
        <Skeleton width={80} />
      </div>
    </div>
  );
};
