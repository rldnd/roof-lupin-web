"use client";

import { memo } from "react";

import type { Review } from "@/common/types/review";

import Content from "./Content";
import Header from "./Header";
import Images from "./Images";

import styles from "./spaceReview.module.scss";

interface Props {
  review: Review;
}

const SpaceReview: React.FC<Props> = ({ review }) => {
  return (
    <li className={styles.wrapper}>
      <Header review={review} />
      {review.images.length > 0 && <Images images={review.images} />}
      <Content content={review.content} />
    </li>
  );
};

export default memo(SpaceReview);
