"use client";

import { memo } from "react";

import type { Review } from "@/common/types/review";

import Answer from "./Answer";
import Content from "./Content";
import Header from "./Header";
import Images from "./Images";

import styles from "./spaceReview.module.scss";

interface Props {
  review: Review;
  isShowAll?: boolean;
}

const SpaceReview: React.FC<Props> = ({ review, isShowAll = false }) => {
  return (
    <li className={styles.wrapper}>
      <Header review={review} />
      {review.images.length > 0 && <Images images={review.images} />}
      <Content content={review.content} isShowAll={isShowAll} />
      {review.reviewAnswers.length > 0 && <Answer answer={review.reviewAnswers[0]} isShowAll={isShowAll} />}
    </li>
  );
};

export default memo(SpaceReview);
