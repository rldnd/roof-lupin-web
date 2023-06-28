"use client";

import cx from "clsx";
import { useAtomValue } from "jotai";

import { SPACE_SORT_MAPPER } from "@/common/constants/space";
import { useScrollDirection } from "@/hooks";
import { categorySortMenuState } from "@/states";

import { IconBottomCaret, IconFilter } from "public/icons";

import TagList from "./TagList";

import styles from "./filter.module.scss";

const Filter: React.FC = () => {
  const scrollDirection = useScrollDirection();

  const categorySortMenu = useAtomValue(categorySortMenuState);

  return (
    <section className={cx(styles.wrapper, styles[scrollDirection])}>
      <TagList />
      <menu className={styles.menu}>
        <li>
          <button type="button" className={styles.filterButton}>
            <IconFilter />
            필터
          </button>
        </li>
        <li>
          <button type="button" className={styles.sortButton}>
            {SPACE_SORT_MAPPER[categorySortMenu.sort]}
            <IconBottomCaret />
          </button>
        </li>
      </menu>
    </section>
  );
};

export default Filter;
