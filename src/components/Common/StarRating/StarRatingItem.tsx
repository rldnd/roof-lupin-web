import { FULL_STAR } from "@/common/constants";

import styles from "./starRatingItem.module.scss";

interface Props {
  viewReviewCount: boolean;
  score: number;
  reviewCount: number;
}

const StarRatingItem: React.FC<Props> = ({ viewReviewCount, score, reviewCount }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.star}>{FULL_STAR}</span>
      <span className={styles.score}>{reviewCount === 0 ? "리뷰 없음" : score}</span>
      {viewReviewCount && <span className={styles.reviewCount}>({reviewCount})</span>}
    </div>
  );
};

export default StarRatingItem;
