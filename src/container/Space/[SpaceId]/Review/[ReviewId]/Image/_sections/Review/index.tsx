"use client";

import { useRef, useState } from "react";

import { useParams } from "next/navigation";

import cx from "clsx";

import type { Review as ReviewType } from "@/common/types/review";
import Header from "@/components/Space/Review/Item/Header";
import { useClientEffect, useSuspenseQuery } from "@/hooks";
import { getReviewApi } from "@/services/review";

import styles from "./review.module.scss";

const Review: React.FC = () => {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const hasMore = useRef(false);
  const { reviewId } = useParams();
  const { data: review } = useSuspenseQuery<ReviewType>(["getReview", reviewId], () => getReviewApi(reviewId));

  const [isExpanded, setIsExpanded] = useState(false);

  const onClickContent = () => {
    if (!contentRef.current || !hasMore.current) return;
    setIsExpanded((prev) => !prev);
    contentRef.current.scrollTo({ top: 0 });
  };

  useClientEffect(() => {
    if (!contentRef.current) return;
    hasMore.current = contentRef.current.scrollHeight !== contentRef.current.offsetHeight;
  }, []);

  return (
    <section
      role="button"
      tabIndex={0}
      className={cx(styles.wrapper, { [styles.isExpanded]: isExpanded })}
      onClick={onClickContent}
    >
      <Header className={styles.header} review={review} menuHidden />
      <p className={cx(styles.content, { [styles.isExpanded]: isExpanded })} ref={contentRef}>
        {review.content}
      </p>
    </section>
  );
};

export default Review;
