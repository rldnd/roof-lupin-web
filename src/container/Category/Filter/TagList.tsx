"use client";

import { useState } from "react";

import { useAtomValue } from "jotai";

import { HorizonDraggable } from "@/components";
import { CategoryInfoFilterBottomSheet } from "@/components/BottomSheets/Category";
import { categorySortMenuState } from "@/states";
import { isEndAtNextDay } from "@/utils/time";

import styles from "./tagList.module.scss";

const TagList: React.FC = () => {
  const [isShowInfoFilter, setIsShowInfoFilter] = useState(false);
  const { locationName, month, day, startAt, endAt, userCount } = useAtomValue(categorySortMenuState);

  return (
    <>
      <HorizonDraggable component="menu" className={styles.wrapper}>
        <li>
          <button type="button">{locationName ?? "전체 지역"}</button>
        </li>
        <li>
          <button type="button" onClick={() => setIsShowInfoFilter(true)}>
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
          <button type="button" onClick={() => setIsShowInfoFilter(true)}>
            {userCount}명
          </button>
        </li>
      </HorizonDraggable>
      <CategoryInfoFilterBottomSheet isShow={isShowInfoFilter} onClose={() => setIsShowInfoFilter(false)} />
    </>
  );
};

export default TagList;
