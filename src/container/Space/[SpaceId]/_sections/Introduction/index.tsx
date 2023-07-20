import dynamic from "next/dynamic";

import type { SpaceDetail } from "@/common/types/space";
import { Tag } from "@/components";
import { StarRatingItem } from "@/components/Common/StarRating";

import CallButton from "./CallButton";
import ReviewButton from "./ReviewButton";

import styles from "./introduction.module.scss";

const IntroductionMoreButton = dynamic(() => import("./IntroductionMoreButton"), { ssr: false });

interface Props {
  space: SpaceDetail;
}

const Introduction: React.FC<Props> = ({ space }) => {
  const { title, description, averageScore, reviewCount, publicTransportations } = space;

  return (
    <section className={styles.wrapper}>
      {publicTransportations.length > 0 && (
        <small className={styles.transport}>
          {publicTransportations[0].name} 도보 {publicTransportations[0].timeTaken}분
        </small>
      )}
      <h1 className={styles.title}>{title}</h1>
      <div className={styles.info}>
        <div className={styles.left}>
          <StarRatingItem score={averageScore} reviewCount={reviewCount} viewReviewCount={false} />
          {reviewCount !== 0 && <ReviewButton reviewCount={reviewCount} />}
        </div>
        <CallButton />
      </div>
      <p className={styles.desc} id="space-detail-description">
        {description}
        <IntroductionMoreButton space={space} />
      </p>
    </section>
  );
};

export default Introduction;
