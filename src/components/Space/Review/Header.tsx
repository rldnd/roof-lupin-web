"use client";

import { memo } from "react";

import Image from "next/image";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { Review } from "@/common/types/review";
import { Tag } from "@/components/Common";
import { StarRating } from "@/components/Common/StarRating";
import { formatYYMMDD } from "@/utils/date";

import { IconThreeDots } from "public/icons";

import styles from "./header.module.scss";

interface Props {
  review: Review;
  menuHidden?: boolean;
  className?: string;
}

const Header: React.FC<Props> = ({ review, className, menuHidden = false }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <div className={styles.info}>
        <div className={styles.imageWrapper}>
          {review.user.profileImage && (
            <Image src={review.user.profileImage} width={40} height={40} alt="프로필 이미지" />
          )}
        </div>
        <p className={styles.profile}>
          <span className={styles.nickname}>{review.user.nickname}</span>
          <time dateTime={formatYYMMDD(review.createdAt)}>{formatYYMMDD(review.createdAt)}</time>
          {review.isBest && <Tag>BEST</Tag>}
        </p>
        <StarRating className={styles.star} score={review.score} />
      </div>
      {!menuHidden && (
        <button type="button">
          <IconThreeDots />
        </button>
      )}
    </div>
  );
};

export default memo(Header);

interface LoadingHeaderProps {
  menuHidden?: boolean;
}

export const LoadingHeader: React.FC<LoadingHeaderProps> = memo(({ menuHidden = false }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <Skeleton className={styles.imageWrapper} />
        <Skeleton width={120} containerClassName={styles.profile} />
        <Skeleton width={50} containerClassName={styles.star} />
      </div>
      {!menuHidden && <Skeleton width={40} />}
    </div>
  );
});
