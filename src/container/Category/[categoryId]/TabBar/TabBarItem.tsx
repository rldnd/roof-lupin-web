"use client";

import { memo, useCallback, useEffect, useRef } from "react";

import { useParams, useRouter } from "next/navigation";

import cx from "clsx";

import type { Category } from "@/common/types/category";

import styles from "./tabBarItem.module.scss";

interface Props {
  category: Category;
}

const TabBarItem: React.FC<Props> = ({ category }) => {
  const { categoryId } = useParams();
  const buttonRef = useRef<HTMLButtonElement>(null);

  const { replace } = useRouter();

  const onClick = useCallback(() => {
    replace(`/categories/${category.id}`);
  }, [replace, category]);

  useEffect(() => {
    if (category.id === categoryId) {
      buttonRef.current?.scrollIntoView({ behavior: "instant", inline: "center" });
    }
  }, [categoryId, category]);

  return (
    <button
      className={cx(styles.wrapper, { [styles.active]: category.id === categoryId })}
      onClick={onClick}
      ref={buttonRef}
    >
      {category.name}
    </button>
  );
};

export default memo(TabBarItem);
