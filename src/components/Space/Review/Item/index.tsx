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
  refetch: () => void;
  className?: string;
  isShowAll?: boolean;
}

const SpaceReview: React.FC<Props> = ({ spaceId, review, refetch, className, isShowAll = false }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <Header review={review} refetch={refetch} />
      {review.images.length > 0 && <Images spaceId={spaceId} reviewId={review.id} images={review.images} />}
      <Content content={review.content} isShowAll={isShowAll} />
      {review.answer && <Answer answer={review.answer} isShowAll={isShowAll} />}
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
