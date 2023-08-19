"use client";

import { useRef, useState } from "react";

import cx from "clsx";

import type { QnAAnswer } from "@/common/types/qna";
import { ArrowButton } from "@/components/Common";
import { useClientEffect } from "@/hooks";

import Title from "./Title";

import styles from "./answer.module.scss";

interface Props {
  answer: QnAAnswer;
  isShowAll: boolean;
}

const Answer: React.FC<Props> = ({ answer, isShowAll }) => {
  const answerRef = useRef<HTMLParagraphElement>(null);
  const [hasMoreButton, setHasMoreButton] = useState(isShowAll);
  const [isClickedViewMore, setIsClickedViewMore] = useState(isShowAll);

  useClientEffect(() => {
    if (!answerRef.current) return;
    if (answerRef.current.scrollHeight !== answerRef.current.offsetHeight) setHasMoreButton(true);
  }, [isClickedViewMore]);

  return (
    <div className={styles.wrapper}>
      <Title nickname={answer.host.name} createdAt={answer.createdAt} />
      <p className={cx(styles.answer, { [styles.isClickedViewMore]: isClickedViewMore })} ref={answerRef}>
        {answer.content}
        <span className={cx(styles.moreButton, { [styles.isShow]: hasMoreButton && !isClickedViewMore })}>
          <ArrowButton direction="down" color="primary" onClick={() => setIsClickedViewMore(true)}>
            더보기
          </ArrowButton>
        </span>
      </p>
    </div>
  );
};

export default Answer;
