import { FULL_STAR } from "@/common/constants";

import styles from "./starRatingItem.module.scss";

interface Props {
  score: number;
  reviewCount?: number;
}

const StarRatingItem: React.FC<Props> = ({ score, reviewCount }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.star}>{FULL_STAR}</span>
      <span className={styles.score}>{score}</span>
      {typeof reviewCount === "number" && <span className={styles.reviewCount}>({reviewCount})</span>}
    </div>
  );
};

export default StarRatingItem;
