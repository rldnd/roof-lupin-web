"use client";

import { Suspense, useState } from "react";

import cx from "clsx";
import { useAtomValue } from "jotai";

import { SPACE_SORT_MAPPER } from "@/common/constants/space";
import { CategoryDetailFilterBottomSheet, CategorySortBottomSheet } from "@/components/BottomSheets/Category";
import { useScrollDirection } from "@/hooks";
import { categorySortMenuState } from "@/states";

import { IconBottomCaret, IconFilter } from "public/icons";

import TagList from "./TagList";

import styles from "./filter.module.scss";

const Filter: React.FC = () => {
  const scrollDirection = useScrollDirection();

  const categorySortMenu = useAtomValue(categorySortMenuState);
  const [isShowCategorySortBottomSheet, setIsShowCategorySortBottomSheet] = useState(false);
  const [isShowCategoryDetailBottomSheet, setIsShowCategoryDetailBottomSheet] = useState(false);

  return (
    <>
      <section className={cx(styles.wrapper, styles[scrollDirection])}>
        <Suspense fallback={null}>
          <TagList />
        </Suspense>
        <menu className={styles.menu}>
          <li>
            <button
              type="button"
              className={styles.filterButton}
              onClick={() => setIsShowCategoryDetailBottomSheet(true)}
            >
              <IconFilter />
              필터
            </button>
          </li>
          <li>
            <button type="button" className={styles.sortButton} onClick={() => setIsShowCategorySortBottomSheet(true)}>
              {SPACE_SORT_MAPPER[categorySortMenu.sort]}
              <IconBottomCaret />
            </button>
          </li>
        </menu>
      </section>
      <CategorySortBottomSheet
        isShow={isShowCategorySortBottomSheet}
        onClose={() => setIsShowCategorySortBottomSheet(false)}
      />
      <CategoryDetailFilterBottomSheet
        isShow={isShowCategoryDetailBottomSheet}
        onClose={() => setIsShowCategoryDetailBottomSheet(false)}
      />
    </>
  );
};

export default Filter;
