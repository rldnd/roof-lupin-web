"use client";

import { type MouseEventHandler, startTransition } from "react";

import cx from "clsx";
import { useAtom } from "jotai";

import { REVIEW_SORT_MAPPER } from "@/common/constants/review";
import { ReviewSort } from "@/common/types/review";
import { BaseBottomSheet } from "@/components/Common";
import { reviewSortMenuState } from "@/states";

import { IconActiveCheckLarge } from "public/icons";

import styles from "./reviewSortBottomSheet.module.scss";

interface Props {
  isShow: boolean;
  onClose: MouseEventHandler<HTMLElement>;
}

const ReviewSortBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const [reviewSortMenu, setReviewSortMenu] = useAtom(reviewSortMenuState);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const sort = e.currentTarget.dataset.sort as ReviewSort;

    console.log(sort);
    startTransition(() => {
      setReviewSortMenu((prev) => ({ ...prev, sort }));
    });

    onClose(e);
  };

  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} title="정렬" blockWindowScroll>
      <menu className={styles.wrapper}>
        <li>
          <button
            className={cx({ [styles.active]: reviewSortMenu.sort === "CREATED_AT" })}
            type="button"
            onClick={onClick}
            data-sort="CREATED_AT"
          >
            <span>{REVIEW_SORT_MAPPER["CREATED_AT"]}</span>
            <IconActiveCheckLarge />
          </button>
        </li>
        <li>
          <button
            className={cx({ [styles.active]: reviewSortMenu.sort === "SCORE_HIGH" })}
            type="button"
            onClick={onClick}
            data-sort="SCORE_HIGH"
          >
            <span>{REVIEW_SORT_MAPPER["SCORE_HIGH"]}</span>
            <IconActiveCheckLarge />
          </button>
        </li>
        <li>
          <button
            className={cx({ [styles.active]: reviewSortMenu.sort === "SCORE_LOW" })}
            type="button"
            onClick={onClick}
            data-sort="SCORE_LOW"
          >
            <span>{REVIEW_SORT_MAPPER["SCORE_LOW"]}</span>
            <IconActiveCheckLarge />
          </button>
        </li>
      </menu>
    </BaseBottomSheet>
  );
};

export default ReviewSortBottomSheet;
