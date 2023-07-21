"use client";

import { HorizonDraggable } from "@/components";

import { IconInfo } from "public/icons";

import styles from "./recommendSearch.module.scss";

const RecommendSearch: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2>루프루팡 추천 검색어</h2>
        <button type="button">
          <IconInfo />
        </button>
      </div>
      <HorizonDraggable component="menu" className={styles.list}>
        <li>
          <button type="button">루프루팡</button>
        </li>
        <li>
          <button type="button">루프루팡</button>
        </li>
        <li>
          <button type="button">루프루팡</button>
        </li>
      </HorizonDraggable>
    </section>
  );
};

export default RecommendSearch;
