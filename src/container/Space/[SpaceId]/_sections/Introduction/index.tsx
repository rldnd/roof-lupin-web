import dynamic from "next/dynamic";

import type { SpaceDetail } from "@/common/types/space";
import { HorizonDraggable } from "@/components";
import { StarRatingItem } from "@/components/Common/StarRating";
import { getHomeCategoryIconPath } from "@/utils/category";

import { IconApprove, IconMaximum, IconStandard } from "public/icons";

import CallButton from "./CallButton";
import ReviewButton from "./ReviewButton";
import TagItem from "./TagItem";

import styles from "./introduction.module.scss";

const IntroductionMoreButton = dynamic(() => import("./IntroductionMoreButton"), { ssr: false });

interface Props {
  space: SpaceDetail;
}

const Introduction: React.FC<Props> = ({ space }) => {
  const {
    title,
    description,
    averageScore,
    reviewCount,
    publicTransportations,
    categories,
    isImmediateReservation,
    overflowUserCount,
    maxUser,
    host,
  } = space;

  return (
    <section className={styles.wrapper}>
      <div className={styles.top}>
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
          <CallButton phoneNumber={host.phoneNumber} />
        </div>
      </div>
      <HorizonDraggable className={styles.tagList}>
        {!isImmediateReservation && <TagItem icon={<IconApprove />} name="승인 후 결제" />}
        <TagItem icon={<IconStandard />} name={`${overflowUserCount}명 기준`} />
        <TagItem icon={<IconMaximum />} name={`최대 ${maxUser}명`} />
        {categories.map((category) => (
          <TagItem
            key={category.id}
            icon={<img src={getHomeCategoryIconPath(category)} alt={`${category.name} 카테고리 이미지`} />}
            name={category.name}
          />
        ))}
      </HorizonDraggable>
      <div className={styles.bottom}>
        <p className={styles.desc} id="space-detail-description">
          {description}
        </p>
        <IntroductionMoreButton space={space} />
      </div>
    </section>
  );
};

export default Introduction;
