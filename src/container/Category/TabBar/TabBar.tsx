"use client";

import { memo, Suspense } from "react";

import dynamic from "next/dynamic";

import cx from "clsx";

import type { Category } from "@/common/types/category";
import { HorizonDraggable } from "@/components";
import { useScrollDirection } from "@/hooks";

import { LoadingTabBarItem } from "./TabBarItem";

import styles from "./tabBar.module.scss";

const TabBarItem = dynamic(() => import("./TabBarItem"), { ssr: false, loading: LoadingTabBarItem });

interface Props {
  categories: Category[];
}

const TabBar: React.FC<Props> = ({ categories }) => {
  const scrollDirection = useScrollDirection();

  return (
    <HorizonDraggable component="nav" className={cx(styles.wrapper, styles[scrollDirection])}>
      {categories.map((category) => (
        <Suspense key={category.id}>
          <TabBarItem category={category} />
        </Suspense>
      ))}
    </HorizonDraggable>
  );
};

export default memo(TabBar);