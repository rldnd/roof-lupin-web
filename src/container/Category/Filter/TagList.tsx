"use client";

import { useState } from "react";

import { useAtomValue } from "jotai";

import { HorizonDraggable } from "@/components";
import { CategoryInfoFilterBottomSheet, CategoryLocationFilterBottomSheet } from "@/components/BottomSheets/Category";
import { categorySortMenuState } from "@/states";
import { isEndAtNextDay } from "@/utils/time";

import styles from "./tagList.module.scss";

const TagList: React.FC = () => {
  const [isShowInfoFilter, setIsShowInfoFilter] = useState(false);
  const [isShowLocationFilter, setIsShowLocationFilter] = useState(false);
  const { locationName, month, day, startAt, endAt, userCount } = useAtomValue(categorySortMenuState);

  return (
    <>
      <HorizonDraggable component="menu" className={styles.wrapper}>
        <li>
          <button type="button" onClick={() => setIsShowLocationFilter(true)}>
            {locationName ?? "전체 지역"}
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setIsShowInfoFilter(true)}>
            {month}월{day}일{" "}
            {typeof startAt === "number" && typeof endAt === "number" && (
              <>
                {isEndAtNextDay(endAt) && "익일"}
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
      <CategoryLocationFilterBottomSheet isShow={isShowLocationFilter} onClose={() => setIsShowLocationFilter(false)} />
    </>
  );
};

export default TagList;
