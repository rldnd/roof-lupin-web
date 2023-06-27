"use client";

import { memo, useCallback } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import cx from "clsx";

import type { Category } from "@/common/types/category";
import { useQueryString } from "@/hooks";

import styles from "./tabBarItem.module.scss";

interface Props {
  category: Category;
}

const TabBarItem: React.FC<Props> = ({ category }) => {
  const { replace } = useRouter();
  const { get } = useSearchParams();
  const { append, getQueryStringWithPath } = useQueryString();

  const onClick = useCallback(() => {
    replace(getQueryStringWithPath(append({ categoryId: category.id })));
  }, [append, category.id, getQueryStringWithPath, replace]);

  return (
    <button className={cx(styles.wrapper, { [styles.active]: category.id === get("categoryId") })} onClick={onClick}>
      {category.name}
    </button>
  );
};

export default memo(TabBarItem);
