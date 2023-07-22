"use client";

import { type ChangeEventHandler, memo, startTransition, useCallback, useEffect, useState } from "react";

import { useSearchParams } from "next/navigation";

import cx from "clsx";
import { useAtom } from "jotai";

import { REVIEW_SORT, REVIEW_SORT_MAPPER } from "@/common/constants/review";
import type { ReviewSort } from "@/common/types/review";
import { Checkbox } from "@/components";
import { ReviewSortBottomSheet } from "@/components/BottomSheets/Review";
import { useScrollDirection } from "@/hooks";
import { initialReviewSortMenu, reviewSortMenuState } from "@/states";
import { getBoolean } from "@/utils/json";

import { IconGrayBottomCaret } from "public/icons";

import styles from "./menu.module.scss";

const Menu: React.FC = () => {
  const scrollDirection = useScrollDirection();
  const searchParams = useSearchParams();

  const [reviewSortMenu, setReviewSortMenu] = useAtom(reviewSortMenuState);
  const [checked, setChecked] = useState(reviewSortMenu.hasPhoto);
  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  const onChangeReviewCheckbox: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      setChecked(e.currentTarget.checked);
      startTransition(() => {
        setReviewSortMenu((prev) => ({ ...prev, hasPhoto: e.currentTarget.checked }));
      });
    },
    [setReviewSortMenu],
  );

  const onClickSortButton = useCallback(() => {
    setIsShowBottomSheet(true);
  }, []);

  useEffect(() => {
    const hasPhotoQuery = searchParams.get("hasPhoto") ?? "";
    const sortQuery = searchParams.get("sort") ?? "";

    const sort = REVIEW_SORT.includes(sortQuery) ? (sortQuery as ReviewSort) : initialReviewSortMenu.sort;
    const hasPhoto =
      typeof getBoolean(hasPhotoQuery) === "boolean"
        ? (getBoolean(hasPhotoQuery) as boolean)
        : initialReviewSortMenu.hasPhoto;

    setChecked(hasPhoto);
    setReviewSortMenu({ sort, hasPhoto });
  }, [searchParams, setReviewSortMenu]);

  return (
    <>
      <menu className={cx(styles.wrapper, styles[scrollDirection])}>
        <Checkbox checked={checked} onChange={onChangeReviewCheckbox}>
          사진 리뷰만
        </Checkbox>
        <button type="button" className={styles.sortButton} onClick={onClickSortButton}>
          <span>{REVIEW_SORT_MAPPER[reviewSortMenu.sort]}</span>
          <IconGrayBottomCaret />
        </button>
      </menu>
      <ReviewSortBottomSheet isShow={isShowBottomSheet} onClose={() => setIsShowBottomSheet(false)} />
    </>
  );
};

export default memo(Menu);
