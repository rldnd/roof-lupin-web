"use client";

import { useMemo, useState } from "react";

import { useAtomValue } from "jotai";

import { LocationFilter } from "@/common/types/location";
import { HorizonDraggable } from "@/components";
import { SpaceInfoFilterBottomSheet, SpaceLocationFilterBottomSheet } from "@/components/BottomSheets/Space";
import { useSuspenseQuery } from "@/hooks";
import { getLocationFiltersApi } from "@/services/location";
import { spaceSortMenuState } from "@/states";
import { addHour, getNextDayText } from "@/utils/time";

import { IconCategoryFilterCalendar, IconCategoryFilterLocation, IconCategoryFilterUser } from "public/icons";

import styles from "./tagList.module.scss";

const TagList: React.FC = () => {
  const [isShowInfoFilter, setIsShowInfoFilter] = useState(false);
  const [isShowLocationFilter, setIsShowLocationFilter] = useState(false);
  const { month, day, startAt, endAt, userCount, locationFilterTopicIds } = useAtomValue(spaceSortMenuState);

  const { data } = useSuspenseQuery<LocationFilter[]>(["getLocationFilters"], () => getLocationFiltersApi());

  const location = useMemo<string>(() => {
    const selectedTopicIds = locationFilterTopicIds === null ? [] : locationFilterTopicIds.split(",").filter(Boolean);
    const selectedItems = data.filter((item) => {
      const topicItemIds = item.topics.map((topic) => topic.id);
      return topicItemIds.every((id) => selectedTopicIds.includes(id));
    });

    if (selectedTopicIds.length === 0) return "전체 지역";
    const selectedTopicCount = selectedItems.flatMap((item) => item.topics).length;
    return `${selectedItems[0].topics[0].name} 외 ${selectedTopicCount - 1}`;
  }, [locationFilterTopicIds, data]);

  return (
    <>
      <HorizonDraggable component="menu" className={styles.wrapper}>
        <li>
          <button type="button" onClick={() => setIsShowLocationFilter(true)}>
            <IconCategoryFilterLocation />
            {location}
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setIsShowInfoFilter(true)}>
            <IconCategoryFilterCalendar />
            {month}월{day}일{" "}
            {typeof startAt === "number" && typeof endAt === "number" && (
              <>
                {getNextDayText(startAt)}
                {startAt}시 ~ {getNextDayText(addHour(endAt, 1), startAt)}
                {addHour(endAt, 1)}시
              </>
            )}
          </button>
        </li>
        <li>
          <button type="button" onClick={() => setIsShowInfoFilter(true)}>
            <IconCategoryFilterUser />
            {userCount}명
          </button>
        </li>
      </HorizonDraggable>
      <SpaceInfoFilterBottomSheet isShow={isShowInfoFilter} onClose={() => setIsShowInfoFilter(false)} />
      <SpaceLocationFilterBottomSheet isShow={isShowLocationFilter} onClose={() => setIsShowLocationFilter(false)} />
    </>
  );
};

export default TagList;
