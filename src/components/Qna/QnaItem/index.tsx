"use client";

import cx from "clsx";

import type { QnA } from "@/common/types/qna";

import Answer from "./Answer";
import Title from "./Title";

import styles from "./qnaItem.module.scss";

interface Props {
  qna: QnA;
  className?: string;
}

const QnaItem: React.FC<Props> = ({ qna, className }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <Title nickname={qna.user.nickname} createdAt={qna.createdAt} onClickSetting={() => {}} />
      <p className={styles.content}>{qna.content}</p>
      {qna.answers.length === 1 && <Answer answer={qna.answers[0]} isShowAll={false} />}
    </li>
  );
};

export default QnaItem;
