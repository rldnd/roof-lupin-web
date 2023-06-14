import type { SpaceDetail } from "@/common/types/space";
import { ArrowButton } from "@/components";
import { StarRatingItem } from "@/components/Common/StarRating";

import styles from "./introduction.module.scss";

interface Props {
  space: SpaceDetail;
}

// TODO: tag components
const Introduction: React.FC<Props> = ({ space }) => {
  const { title, hashtags, reviewCount, description, publicTransportations } = space;

  return (
    <section className={styles.wrapper}>
      {publicTransportations.length > 0 && (
        <small className={styles.transport}>
          {publicTransportations[0].name} 도보{publicTransportations[0].timeTaken}분
        </small>
      )}
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.info}>
        <StarRatingItem score={space.averageScore} />
        <ArrowButton direction="right" isBold color="primary">
          리뷰 {reviewCount}개
        </ArrowButton>
      </div>
      <ul>
        {hashtags.map((tag) => (
          <li key={tag.id}>{tag.name}</li>
        ))}
      </ul>
      <p className={styles.desc}>{description}</p>
      <ArrowButton direction="right" color="primary" className={styles.more}>
        더보기
      </ArrowButton>
    </section>
  );
};

export default Introduction;
