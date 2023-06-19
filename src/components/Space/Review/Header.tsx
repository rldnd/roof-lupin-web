"use client";

import Image from "next/image";

import type { Review } from "@/common/types/review";
import { Tag } from "@/components/Common";
import { StarRating } from "@/components/Common/StarRating";
import { formatYYMMDD } from "@/utils/date";

import { IconThreeDots } from "public/icons";

import styles from "./header.module.scss";

interface Props {
  review: Review;
}

const Header: React.FC<Props> = ({ review }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <div className={styles.imageWrapper}>
          {review.user.profileImage && (
            <Image src={review.user.profileImage} width={40} height={40} alt="프로필 이미지" />
          )}
        </div>
        <p className={styles.profile}>
          <span className={styles.nickname}>{review.user.nickname}</span>
          <time dateTime={formatYYMMDD(review.createdAt)}>{formatYYMMDD(review.createdAt)}</time>
          {review.isBest && (
            <Tag size="small" type="color">
              BEST
            </Tag>
          )}
        </p>
        <StarRating className={styles.star} score={review.score} />
      </div>
      <button type="button">
        <IconThreeDots />
      </button>
    </div>
  );
};

export default Header;
