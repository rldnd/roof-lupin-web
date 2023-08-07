"use client";

import { useAtomValue } from "jotai";

import { HorizonDraggable } from "@/components";
import { categorySortMenuState } from "@/states";
import { isEndAtNextDay } from "@/utils/time";

import styles from "./tagList.module.scss";

const TagList: React.FC = () => {
  const { locationName, month, day, startAt, endAt, userCount } = useAtomValue(categorySortMenuState);

  return (
    <HorizonDraggable component="menu" className={styles.wrapper}>
      <li>
        <button type="button">{locationName ?? "전체 지역"}</button>
      </li>
      <li>
        <button type="button">
          {month}월{day}일{" "}
          {typeof startAt === "number" && typeof endAt === "number" && (
            <>
              {startAt}시 ~ {isEndAtNextDay(endAt) && "익일"}
              {endAt}시
            </>
          )}
        </button>
      </li>
      <li>
        <button type="button">{userCount}명</button>
      </li>
    </HorizonDraggable>
  );
};

export default TagList;
