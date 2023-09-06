"use client";

import { useState } from "react";

import Link from "next/link";

import { useMutation } from "@tanstack/react-query";
import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { QnA } from "@/common/types/qna";
import { MyQnaMenuBottomSheet } from "@/components/BottomSheets/Qna";
import { usePopConfirm, useToast } from "@/hooks";
import { deleteQnaApi } from "@/services/qna";
import { dayjs } from "@/utils/date";

import { IconGrayRightChevronSmall, IconThreeDotsLarge } from "public/icons";

import styles from "./myQnaItem.module.scss";

interface Props {
  qna: QnA;
  refetch: () => void;
  className?: string;
}

const MyQnaItem: React.FC<Props> = ({ qna, className, refetch }) => {
  const { addToast } = useToast();
  const { openPopConfirm } = usePopConfirm();
  const { space, createdAt, answer } = qna;
  const createdDate = dayjs(createdAt).format("YYYY.MM.DD").slice(2);
  const answeredDate = answer ? dayjs(answer.createdAt).format("YYYY.MM.DD").slice(2) : "";

  const [isShowMenu, setIsShowMenu] = useState(false);

  const { mutate } = useMutation(deleteQnaApi, {
    onSuccess: () => {
      addToast({ message: "질문이 삭제되었어요!" });
      refetch();
    },
  });

  const onClickDelete = () => {
    setIsShowMenu(false);
    openPopConfirm({
      title: "질문을 삭제하시겠어요?",
      description: "한 번 삭제하면 다시 작성할 수 없어요!",
      onConfirm: () => mutate(qna.id),
    });
  };

  return (
    <>
      <li className={cx(styles.wrapper, className)}>
        <div className={styles.titleWrapper}>
          <Link href={`/spaces/${space.id}`} className={styles.spaceTitle}>
            {space.title}
            <button type="button">
              <IconGrayRightChevronSmall />
            </button>
          </Link>
          <button type="button" aria-label="qna 설정" className={styles.settings} onClick={() => setIsShowMenu(true)}>
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
      <MyQnaMenuBottomSheet
        isShow={isShowMenu}
        onClose={() => setIsShowMenu(false)}
        qnaId={qna.id}
        onClickDelete={onClickDelete}
      />
    </>
  );
};

export default MyQnaItem;

export const LoadingMyQnaItem: React.FC<{ className?: string }> = ({ className }) => {
  return <Skeleton containerClassName={cx(styles.wrapper, className)} height={100} />;
};
