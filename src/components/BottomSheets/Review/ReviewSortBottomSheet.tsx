"use client";

import { type MouseEventHandler, startTransition } from "react";

import { useAtom } from "jotai";

import { REVIEW_SORT_MAPPER } from "@/common/constants/review";
import { ReviewSort } from "@/common/types/review";
import { BaseBottomSheet } from "@/components/Common";
import { reviewSortMenuState } from "@/states";

import { SortMenu, SortMenuItem } from "../_shared";

interface Props {
  isShow: boolean;
  onClose: MouseEventHandler<HTMLElement>;
}

const ReviewSortBottomSheet: React.FC<Props> = ({ isShow, onClose }) => {
  const [reviewSortMenu, setReviewSortMenu] = useAtom(reviewSortMenuState);

  const onClick: MouseEventHandler<HTMLButtonElement> = (e) => {
    const sort = e.currentTarget.dataset.sort as ReviewSort;

    startTransition(() => {
      setReviewSortMenu((prev) => ({ ...prev, sort }));
    });

    onClose(e);
  };

  return (
    <BaseBottomSheet isShow={isShow} onClose={onClose} title="정렬" blockWindowScroll>
      <SortMenu>
        <SortMenuItem isActive={reviewSortMenu.sort === "CREATED_AT"} onClick={onClick} data-sort="CREATED_AT">
          {REVIEW_SORT_MAPPER["CREATED_AT"]}
        </SortMenuItem>
        <SortMenuItem isActive={reviewSortMenu.sort === "SCORE_HIGH"} onClick={onClick} data-sort="SCORE_HIGH">
          {REVIEW_SORT_MAPPER["SCORE_HIGH"]}
        </SortMenuItem>
        <SortMenuItem isActive={reviewSortMenu.sort === "SCORE_LOW"} onClick={onClick} data-sort="SCORE_LOW">
          {REVIEW_SORT_MAPPER["SCORE_LOW"]}
        </SortMenuItem>
      </SortMenu>
    </BaseBottomSheet>
  );
};

export default ReviewSortBottomSheet;
