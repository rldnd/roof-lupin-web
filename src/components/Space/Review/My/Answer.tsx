"use client";

import type { ReviewAnswer } from "@/common/types/review";
import { formatYYMMDD } from "@/utils/date";

import styles from "./answer.module.scss";

interface Props {
  answer: ReviewAnswer;
}

const Answer: React.FC<Props> = ({ answer }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.info}>
        <span className={styles.name}>{answer.host.name}</span>
        <time dateTime={formatYYMMDD(answer.createdAt)}>{formatYYMMDD(answer.createdAt)}</time>
      </div>
      <p className={styles.answer}>{answer.content}</p>
    </div>
  );
};

export default Answer;
