"use client";

import { useParams } from "next/navigation";

import { useAtom } from "jotai";
import { useUnmount } from "react-use";

import type { ReservationDetail } from "@/common/types/reservation";
import { StarRatingMenu } from "@/components/Common/StarRating";
import { useSuspenseQuery } from "@/hooks";
import { getMyReservationApi } from "@/services/reservation";
import { createReviewBodyState, initialCreateReviewBody } from "@/states";
import { dayjs } from "@/utils/date";

import styles from "./topSection.module.scss";

const TopSection: React.FC = () => {
  const [body, setBody] = useAtom(createReviewBodyState);
  const { reservationId } = useParams();
  const { data } = useSuspenseQuery<ReservationDetail>(
    ["getMyReservation", reservationId],
    () => getMyReservationApi(reservationId),
    {
      onSuccess: (res) => {
        setBody((prev) => ({ ...prev, spaceId: res.space.id, reservationId }));
      },
    },
  );

  const onClickStar = (score: number) => {
    setBody((prev) => ({ ...prev, score }));
  };

  const { year, month, day, space } = data;
  const visitedDate = dayjs(`${year}-${month}-${day}`).format("MM월 DD일");

  useUnmount(() => {
    setBody(initialCreateReviewBody);
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
  return null;
};
