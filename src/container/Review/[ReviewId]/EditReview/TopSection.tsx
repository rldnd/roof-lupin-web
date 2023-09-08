"use client";

import { useParams } from "next/navigation";

import { useAtom } from "jotai";
import { useUnmount } from "react-use";

import type { Review } from "@/common/types/review";
import { StarRatingMenu } from "@/components/Common/StarRating";
import { useSuspenseQuery } from "@/hooks";
import { getReviewApi } from "@/services/review";
import { initialCreateReviewBody, updateReviewBodyState } from "@/states";
import { dayjs } from "@/utils/date";

import styles from "./topSection.module.scss";

const TopSection: React.FC = () => {
  const [body, setBody] = useAtom(updateReviewBodyState);
  const { reviewId } = useParams();

  const { data } = useSuspenseQuery<Review>(["getReview", reviewId], () => getReviewApi(reviewId), {
    onSuccess: ({ content, score, images }) => {
      setBody({ content, score, images: images.map((image) => image.url) });
    },
  });

  const onClickStar = (score: number) => {
    setBody((prev) => ({ ...prev, score }));
  };

  const { reservationRentalTypes, space } = data;
  // const visitedDate = dayjs(`${year}-${month}-${day}`).format("MM월 DD일");

  useUnmount(() => {
    setBody(initialCreateReviewBody);
  });

  return (
    <section className={styles.wrapper}>
      <small className={styles.dateInfo}>
        {/* <time dateTime={dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD")}>{visitedDate}</time>에 방문했던 */}
      </small>
      <h1 className={styles.title}>{`${space.title},\n어떠셨어요?`}</h1>
      <StarRatingMenu score={body.score} onClick={onClickStar} />
    </section>
  );
};

export default TopSection;

export const LoadingTopSection: React.FC = () => {
  return null;
};
