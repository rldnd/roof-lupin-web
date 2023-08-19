"use client";

import { useState } from "react";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { QnA } from "@/common/types/qna";
import { MyQnaMenuBottomSheet, OtherQnaMenuBottomSheet } from "@/components/BottomSheets/Qna";
import { useMe } from "@/hooks/queries";

import Answer from "./Answer";
import Title from "./Title";

import styles from "./qnaItem.module.scss";

interface Props {
  qna: QnA;
  className?: string;
}

const QnaItem: React.FC<Props> = ({ qna, className }) => {
  const { isLogined, me } = useMe();
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  return (
    <>
      <li className={cx(styles.wrapper, className)}>
        <Title
          nickname={qna.user.nickname}
          createdAt={qna.createdAt}
          onClickSetting={() => setIsShowBottomSheet(true)}
        />
        <p className={styles.content}>{qna.content}</p>
        {qna.answers.length === 1 && <Answer answer={qna.answers[0]} isShowAll={false} />}
      </li>
      {isLogined && me?.id === qna.user.id && (
        <MyQnaMenuBottomSheet isShow={isShowBottomSheet} onClose={() => setIsShowBottomSheet(false)} />
      )}
      {(!isLogined || me?.id !== qna.user.id) && (
        <OtherQnaMenuBottomSheet
          isShow={isShowBottomSheet}
          onClose={() => setIsShowBottomSheet(false)}
          qnaId={qna.id}
        />
      )}
    </>
  );
};

export default QnaItem;

export const LoadingQnaItem: React.FC<{ className?: string }> = ({ className }) => {
  return <Skeleton containerClassName={cx(styles.wrapper, className)} height={100} />;
};
