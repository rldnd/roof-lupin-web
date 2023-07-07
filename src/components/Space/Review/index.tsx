"use client";

import { memo } from "react";

import cx from "clsx";

import type { Review } from "@/common/types/review";

import Answer from "./Answer";
import Content, { LoadingContent } from "./Content";
import Header, { LoadingHeader } from "./Header";
import Images from "./Images";

import styles from "./spaceReview.module.scss";

interface Props {
  review: Review;
  spaceId: string;
  className?: string;
  isShowAll?: boolean;
}

const SpaceReview: React.FC<Props> = ({ spaceId, review, className, isShowAll = false }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <Header review={review} />
      {review.images.length > 0 && <Images spaceId={spaceId} reviewId={review.id} images={review.images} />}
      <Content content={review.content} isShowAll={isShowAll} />
      {review.reviewAnswers.length > 0 && <Answer answer={review.reviewAnswers[0]} isShowAll={isShowAll} />}
    </li>
  );
};

export default memo(SpaceReview);

export const LoadingSpaceReview: React.FC<{ className?: string }> = memo(({ className }) => {
  return (
    <div className={cx(styles.loadingWrapper, className)}>
      <LoadingHeader />
      <LoadingContent />
    </div>
  );
});
