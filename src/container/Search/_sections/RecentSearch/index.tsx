"use client";

import { HorizonDraggable } from "@/components";

import { IconGrayCloseSmall } from "public/icons";

import styles from "./recentSearch.module.scss";

const RecentSearch: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>최근 검색어</h2>
      <HorizonDraggable component="menu" className={styles.list}>
        <li>
          <button type="button" className={styles.tagButton}>
            글램핑
          </button>
          <button type="button" className={styles.deleteButton}>
            <IconGrayCloseSmall />
          </button>
        </li>
        <li>
          <button type="button" className={styles.tagButton}>
            글램핑
          </button>
          <button type="button" className={styles.deleteButton}>
            <IconGrayCloseSmall />
          </button>
        </li>
        <li>
          <button type="button" className={styles.tagButton}>
            글램핑
          </button>
          <button type="button" className={styles.deleteButton}>
            <IconGrayCloseSmall />
          </button>
        </li>
      </HorizonDraggable>
    </section>
  );
};

export default RecentSearch;
