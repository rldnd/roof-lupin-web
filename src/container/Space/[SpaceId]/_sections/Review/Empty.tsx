import { IconStar } from "public/icons";

import styles from "./emptyReview.module.scss";

const EmptyReview: React.FC = () => {
  return (
    <section id="review-section" className={styles.wrapper}>
      <h2 className={styles.title}>
        <IconStar />
        리뷰 없음
      </h2>
      <p className={styles.text}>아직 등록된 리뷰가 없어요</p>
    </section>
  );
};

export default EmptyReview;
