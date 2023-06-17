import Skeleton from "react-loading-skeleton";

import type { Review } from "@/common/types/review";

import Carousel from "./Carousel";

import styles from "./bestPhoto.module.scss";

interface Props {
  bestReviewsPromise: Promise<Review[]>;
}

async function BestPhoto({ bestReviewsPromise }: Props) {
  const bestReviews = await bestReviewsPromise;

  return (
    <section id="best-photo-section" className={styles.wrapper}>
      <div className={styles.top}>
        <small className={styles.small}>루프루팡 PICK!</small>
        <h2 className={styles.title}>
          베스트 포토<span>{bestReviews.length}</span>
        </h2>
      </div>
      <Carousel bestReviews={bestReviews} />
    </section>
  );
}

export default BestPhoto;

export const LoadingBestPhoto: React.FC = () => {
  return (
    <section id="best-photo-section" className={styles.wrapper}>
      <div className={styles.top}>
        <Skeleton className={styles.small} width={60} height={24} />
        <Skeleton className={styles.title} width={100} height={20} />
      </div>
    </section>
  );
};
