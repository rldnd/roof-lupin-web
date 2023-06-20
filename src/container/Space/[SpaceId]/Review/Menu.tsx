"use client";

import { useEffect } from "react";

import { useParams, useRouter, useSearchParams } from "next/navigation";

import { useAtom } from "jotai";
import queryString from "query-string";

import { REVIEW_SORT } from "@/common/constants/review";
import { ReviewSort } from "@/common/types/review";
import { useScrollDirection } from "@/hooks";
import { initialReviewSortMenu, reviewSortMenuState } from "@/states/review";
import { getBoolean } from "@/utils/json";

import styles from "./menu.module.scss";

const Menu: React.FC = () => {
  const router = useRouter();
  const { spaceId } = useParams();
  const scrollDirection = useScrollDirection();
  const searchParams = useSearchParams();

  const [reviewSortMenu, setReviewSortMenu] = useAtom(reviewSortMenuState);

  const hasPhotoQuery = searchParams.get("hasPhoto") ?? "";
  const sortQuery = searchParams.get("sort") ?? "";

  useEffect(() => {
    const sort = REVIEW_SORT.includes(sortQuery) ? (sortQuery as ReviewSort) : initialReviewSortMenu.sort;
    const hasPhoto =
      typeof getBoolean(hasPhotoQuery) === "boolean"
        ? (getBoolean(hasPhotoQuery) as boolean)
        : initialReviewSortMenu.hasPhoto;

    setReviewSortMenu({ sort, hasPhoto });
  }, [sortQuery, hasPhotoQuery, setReviewSortMenu]);

  return (
    <menu className={styles.wrapper}>
      메뉴{reviewSortMenu.sort}
      {reviewSortMenu.hasPhoto ? "true" : "false"}
      <button type="button">하이</button>
    </menu>
  );
};

export default Menu;
