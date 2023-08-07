"use client";

import { ChangeEventHandler, type ReactNode, useCallback } from "react";

import { useAtom } from "jotai";
import { xor } from "lodash-es";

import type { Category } from "@/common/types/category";
import { locationCategoryIdsState } from "@/states";

import styles from "./categoryItem.module.scss";

interface Props {
  children: ReactNode;
  category: Category;
  totalCount: number;
}

const CategoryItem: React.FC<Props> = ({ children, category, totalCount }) => {
  const [locationCategoryIds, setLocationCategoryIds] = useAtom(locationCategoryIdsState);

  const onChange: ChangeEventHandler<HTMLInputElement> = useCallback(
    (e) => {
      const id = e.currentTarget.value;
      setLocationCategoryIds((prev) => {
        const ids = xor(prev, [id]);
        if (ids.length === totalCount) return [];
        return ids;
      });
    },
    [setLocationCategoryIds, totalCount],
  );

  return (
    <label className={styles.wrapper}>
      {children}
      <input
        type="checkbox"
        value={category.id}
        onChange={onChange}
        checked={locationCategoryIds.includes(category.id)}
        hidden
      />
    </label>
  );
};

export default CategoryItem;
