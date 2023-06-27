"use client";

import { memo } from "react";

import cx from "clsx";

import type { Category } from "@/common/types/category";
import { HorizonDraggable } from "@/components";
import { useScrollDirection } from "@/hooks";

import TabBarItem from "./TabBarItem";

import styles from "./tabBar.module.scss";

interface Props {
  categories: Category[];
}

const TabBar: React.FC<Props> = ({ categories }) => {
  const scrollDirection = useScrollDirection();

  return (
    <HorizonDraggable component="nav" className={cx(styles.wrapper, styles[scrollDirection])}>
      {categories.map((category) => (
        <TabBarItem key={category.id} category={category} />
      ))}
    </HorizonDraggable>
  );
};

export default memo(TabBar);
