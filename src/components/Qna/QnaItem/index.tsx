"use client";

import { useState } from "react";

import { useMutation } from "@tanstack/react-query";
import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { QnA } from "@/common/types/qna";
import { MyQnaMenuBottomSheet, OtherQnaMenuBottomSheet } from "@/components/BottomSheets/Qna";
import { usePopConfirm, useToast } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { deleteQnaApi } from "@/services/qna";

import Answer from "./Answer";
import Title from "./Title";

import styles from "./qnaItem.module.scss";

interface Props {
  qna: QnA;
  refetch: () => void;
  className?: string;
}

const QnaItem: React.FC<Props> = ({ qna, className, refetch }) => {
  const { addToast } = useToast();
  const { openPopConfirm } = usePopConfirm();
  const { isLogined, me } = useMe();
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  const { mutate } = useMutation(deleteQnaApi, {
    onSuccess: () => {
      addToast({ message: "질문이 삭제되었어요!" });
      refetch();
    },
  });

  const onClickDelete = () => {
    openPopConfirm({
      title: "질문을 삭제하시겠어요?",
      description: "한 번 삭제하면 다시 작성할 수 없어요!",
      onConfirm: () => mutate(qna.id),
    });
  };

  return (
    <>
      <li className={cx(styles.wrapper, className)}>
        <Title
          nickname={qna.user.nickname}
          createdAt={qna.createdAt}
          onClickSetting={() => setIsShowBottomSheet(true)}
        />
        <p className={styles.content}>{qna.content}</p>
        {qna.answer && <Answer answer={qna.answer} isShowAll={false} />}
      </li>
      {isLogined && me?.id === qna.user.id && (
        <MyQnaMenuBottomSheet
          qnaId={qna.id}
          isShow={isShowBottomSheet}
          onClose={() => setIsShowBottomSheet(false)}
          onClickDelete={onClickDelete}
        />
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
