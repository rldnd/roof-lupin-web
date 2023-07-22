"use client";

import { HorizonDraggable } from "@/components";

import styles from "./tagList.module.scss";

const TagList: React.FC = () => {
  return (
    <HorizonDraggable className={styles.wrapper}>
      <li>전체 지역</li>
      <li>2명</li>
    </HorizonDraggable>
  );
};

export default TagList;
