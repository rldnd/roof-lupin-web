import type { Review as ReviewType } from "@/common/types/review";
import { SpaceReview } from "@/components";
import { StarRatingItem } from "@/components/Common/StarRating";

import MoreButton from "./MoreButton";

import styles from "./review.module.scss";

interface Props {
  reviews: ReviewType[];
  reviewCount: number;
  score: number;
}

const Review: React.FC<Props> = ({ reviews, score, reviewCount }) => {
  return (
    <section id="review-section" className={styles.wrapper}>
      <h2>
        <StarRatingItem
          starSize={24}
          className={styles.starRatingItem}
          score={score}
          reviewCount={reviewCount}
          viewReviewCount={false}
        />
        <span className={styles.reviewCount}>{reviewCount}개 리뷰</span>
      </h2>
      <ul className={styles.reviewList}>
        {reviews.map((review) => (
          <SpaceReview key={review.id} review={review} />
        ))}
      </ul>
      {reviewCount > 3 && <MoreButton count={reviewCount - 3} />}
    </section>
  );
};

export default Review;
