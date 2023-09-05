"use client";

import Link from "next/link";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { QnA } from "@/common/types/qna";
import { dayjs } from "@/utils/date";

import { IconGrayRightChevronSmall, IconThreeDotsLarge } from "public/icons";

import styles from "./myQnaItem.module.scss";

interface Props {
  qna: QnA;
  className?: string;
}

const MyQnaItem: React.FC<Props> = ({ qna, className }) => {
  const { space, createdAt, answer } = qna;
  const createdDate = dayjs(createdAt).format("YYYY.MM.DD").slice(2);
  const answeredDate = answer ? dayjs(answer.createdAt).format("YYYY.MM.DD").slice(2) : "";

  return (
    <li className={cx(styles.wrapper, className)}>
      <div className={styles.titleWrapper}>
        <Link href={`/spaces/${space.id}`} className={styles.spaceTitle}>
          {space.title}
          <button type="button">
            <IconGrayRightChevronSmall />
          </button>
        </Link>
        <button type="button" aria-label="qna 설정" className={styles.settings}>
          <IconThreeDotsLarge />
        </button>
        <time className={styles.time} dateTime={createdDate}>
          {createdDate}
        </time>
      </div>
      <p className={styles.content}>{qna.content}</p>
      {qna.answer && (
        <div className={styles.answerWrapper}>
          <div className={styles.answerTitleWrapper}>
            호스트 답변<time dateTime={answeredDate}>{answeredDate}</time>
          </div>
          <div className={styles.answer}>{answer?.content}</div>
        </div>
      )}
    </li>
  );
};

export default MyQnaItem;

export const LoadingMyQnaItem: React.FC<{ className?: string }> = ({ className }) => {
  return <Skeleton containerClassName={cx(styles.wrapper, className)} height={100} />;
};
