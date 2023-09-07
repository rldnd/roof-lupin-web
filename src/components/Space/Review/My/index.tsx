"use client";

import { memo } from "react";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { Review } from "@/common/types/review";

import Header, { LoadingHeader } from "./Header";
import Images, { LoadingImages } from "./Images";
import RentalTypes, { LoadingRentalTypes } from "./RentalTypes";

import styles from "./mySpaceReview.module.scss";

interface Props {
  review: Review;
  className?: string;
}

const MySpaceReview: React.FC<Props> = ({ review, className }) => {
  return (
    <>
      <li className={cx(styles.wrapper, className)}>
        <Header review={review} />
        <p className={styles.content}>{review.content}</p>
        <Images images={review.images} reviewId={review.id} />
        <RentalTypes review={review} />
      </li>
    </>
  );
};

export default memo(MySpaceReview);

export const LoadingMySpaceReview: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <LoadingHeader />
      <Skeleton width="100%" className={styles.content} height={80} />
      <LoadingImages />
      <LoadingRentalTypes />
    </div>
  );
};
