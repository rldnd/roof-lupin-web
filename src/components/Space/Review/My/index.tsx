"use client";

import { memo } from "react";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { Review } from "@/common/types/review";

import Answer from "./Answer";
import Header, { LoadingHeader } from "./Header";
import Images, { LoadingImages } from "./Images";
import RentalTypes, { LoadingRentalTypes } from "./RentalTypes";

import styles from "./mySpaceReview.module.scss";

interface Props {
  review: Review;
  refetch: () => void;
  className?: string;
}

const MySpaceReview: React.FC<Props> = ({ review, className, refetch }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <Header review={review} refetch={refetch} />
      <p className={styles.content}>{review.content}</p>
      <Images images={review.images} reviewId={review.id} />
      <RentalTypes review={review} />
      {review.answer && <Answer answer={review.answer} />}
    </li>
  );
};

export default memo(MySpaceReview);

export const LoadingMySpaceReview: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <LoadingHeader />
      <Skeleton className={styles.loadingContent} height={80} />
      <LoadingImages />
      <LoadingRentalTypes />
    </div>
  );
};
