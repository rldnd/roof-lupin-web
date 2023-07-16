"use client";

import { memo, useCallback, useRef } from "react";

import cx from "clsx";
import { useAtom } from "jotai";
import Skeleton from "react-loading-skeleton";

import type { Category } from "@/common/types/category";
import { useQueryString } from "@/hooks";
import { type CategorySortMenu, categorySortMenuState } from "@/states";

import styles from "./tabBarItem.module.scss";

interface Props {
  category: Category;
}

const TabBarItem: React.FC<Props> = ({ category }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { append, getQueryStringWithPath } = useQueryString();

  const [categoryMenu, setCategorySortMenu] = useAtom(categorySortMenuState);

  const onClick = useCallback(() => {
    history.replaceState(null, "", getQueryStringWithPath(append({ categoryId: category.id })));
    window.scrollTo({ top: 0, behavior: "smooth" });
    buttonRef.current?.scrollIntoView({ behavior: "smooth", inline: "center" });
    setCategorySortMenu((prev: CategorySortMenu) => ({ ...prev, categoryIds: category.id }));
  }, [append, category.id, getQueryStringWithPath, setCategorySortMenu]);

  return (
    <button
      className={cx(styles.wrapper, { [styles.active]: category.id === categoryMenu.categoryIds })}
      onClick={onClick}
      ref={buttonRef}
    >
      {category.name}
    </button>
  );
};

export default memo(TabBarItem);

export const LoadingTabBarItem: React.FC = () => {
  return <Skeleton containerClassName={styles.wrapper} width={60} />;
};
