"use client";

import { useState } from "react";

import Link from "next/link";

import { useMutation } from "@tanstack/react-query";
import Skeleton from "react-loading-skeleton";

import type { Review } from "@/common/types/review";
import { MyReviewMenuBottomSheet } from "@/components/BottomSheets/Review";
import { StarRating } from "@/components/Common/StarRating";
import { usePopConfirm, useToast } from "@/hooks";
import { deleteReviewApi } from "@/services/review";
import { formatYYMMDD } from "@/utils/date";

import { IconGrayRightChevronSmall, IconThreeDotsLarge } from "public/icons";

import styles from "./header.module.scss";

interface Props {
  review: Review;
  refetch: () => void;
}

const Header: React.FC<Props> = ({ review, refetch }) => {
  const { addToast } = useToast();
  const { openPopConfirm } = usePopConfirm();
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  const { space } = review;
  const createdAt = formatYYMMDD(review.createdAt);

  const { mutate } = useMutation(deleteReviewApi, {
    onSuccess: () => {
      addToast({ message: "리뷰가 삭제되었어요!" });
      refetch();
    },
  });

  const onClickDelete = () => {
    setIsShowBottomSheet(false);
    openPopConfirm({
      title: "리뷰를 삭제하시겠어요?",
      description: "한 번 삭제하면 다시 작성할 수 없어요!",
      onConfirm: () => mutate(review.id),
    });
  };

  return (
    <>
      <div className={styles.wrapper}>
        <Link className={styles.spaceTitle} href={`/spaces/${space.id}`}>
          {space.title}
          <button type="button">
            <IconGrayRightChevronSmall />
          </button>
        </Link>
        <button
          type="button"
          aria-label="리뷰 설정"
          className={styles.settings}
          onClick={() => setIsShowBottomSheet(true)}
        >
          <IconThreeDotsLarge />
        </button>
        <div className={styles.info}>
          <StarRating score={review.score} />
          <time dateTime={createdAt} className={styles.createdAt}>
            {createdAt}
          </time>
        </div>
      </div>
      <MyReviewMenuBottomSheet
        isShow={isShowBottomSheet}
        onClose={() => setIsShowBottomSheet(false)}
        onClickDelete={onClickDelete}
        reviewId={review.id}
      />
    </>
  );
};

export default Header;

export const LoadingHeader: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <Skeleton className={styles.spaceTitle} width={100} />
      <button type="button" className={styles.settings}>
        <IconThreeDotsLarge />
      </button>
      <div className={styles.info}>
        <Skeleton width={80} />
      </div>
    </div>
  );
};
