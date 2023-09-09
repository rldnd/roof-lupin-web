"use client";

import { useParams } from "next/navigation";

import cx from "clsx";
import { useAtom } from "jotai";
import Skeleton from "react-loading-skeleton";
import { useUnmount } from "react-use";

import type { Review } from "@/common/types/review";
import { StarRatingMenu } from "@/components/Common/StarRating";
import { useSuspenseQuery } from "@/hooks";
import { getReviewApi } from "@/services/review";
import { initialUpdateReviewBody, updateReviewBodyState } from "@/states";
import { dayjs } from "@/utils/date";

import styles from "./topSection.module.scss";

const TopSection: React.FC = () => {
  const [body, setBody] = useAtom(updateReviewBodyState);
  const { reviewId } = useParams();

  const { data } = useSuspenseQuery<Review>(["getReview", reviewId], () => getReviewApi(reviewId), {
    onSuccess: ({ content, score, images }) => {
      setBody({
        content,
        score,
        tempImages: images.map((image) => ({ preview: image.url })),
        reviewId,
        images: [],
      });
    },
    refetchOnMount: true,
  });

  const onClickStar = (score: number) => {
    setBody((prev) => ({ ...prev, score }));
  };

  const { reservation, space } = data;
  const { year, month, day } = reservation;

  const visitedDate = dayjs(`${year}-${month}-${day}`).format("MM월 DD일");

  useUnmount(() => {
    setBody(initialUpdateReviewBody);
  });

  return (
    <section className={styles.wrapper}>
      <small className={styles.dateInfo}>
        <time dateTime={dayjs(`${year}-${month}-${day}`).format("YYYY-MM-DD")}>{visitedDate}</time>에 방문했던
      </small>
      <h1 className={styles.title}>{`${space.title},\n어떠셨어요?`}</h1>
      <StarRatingMenu score={body.score} onClick={onClickStar} />
    </section>
  );
};

export default TopSection;

export const LoadingTopSection: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <Skeleton className={styles.dateInfo} width={120} />
      <div className={styles.titleWrapper}>
        <Skeleton className={cx(styles.title, styles.loading)} width={130} />
        <Skeleton className={styles.title} width={60} />
      </div>
      <Skeleton width={150} />
    </section>
  );
};
