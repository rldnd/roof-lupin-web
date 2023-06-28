"use client";

import { HorizonDraggable } from "@/components";

import Tag from "./Tag";

import styles from "./tagList.module.scss";

const TagList: React.FC = () => {
  return (
    <HorizonDraggable className={styles.wrapper}>
      <Tag>전체 지역</Tag>
      <Tag>2명</Tag>
    </HorizonDraggable>
  );
};

export default TagList;
