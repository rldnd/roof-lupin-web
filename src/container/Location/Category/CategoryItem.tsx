"use client";

import type { ReactNode } from "react";

import type { Category } from "@/common/types/category";

import styles from "./categoryItem.module.scss";

interface Props {
  children: ReactNode;
  category: Category;
}

const CategoryItem: React.FC<Props> = ({ children, category }) => {
  return (
    <label className={styles.wrapper}>
      {children}
      <input type="checkbox" hidden />
    </label>
  );
};

export default CategoryItem;
