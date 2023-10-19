"use client";

import { type ChangeEventHandler, type Dispatch, type SetStateAction, useMemo } from "react";

import { xor } from "lodash-es";

import type { LocationFilter } from "@/common/types/location";
import { useSuspenseQuery } from "@/hooks";
import { getLocationFiltersApi } from "@/services/location";

import { CheckMenu, CheckMenuItem, LoadingCheckMenu } from "../../_shared";

import styles from "./content.module.scss";

interface Props {
  locationFilterTopicIds: string | null;
  setLocationFilterTopicIds: Dispatch<SetStateAction<string | null>>;
}

const Content: React.FC<Props> = ({ locationFilterTopicIds, setLocationFilterTopicIds }) => {
  const locationFilterTopics = locationFilterTopicIds === null ? [] : locationFilterTopicIds.split(",").filter(Boolean);
  const { data } = useSuspenseQuery<LocationFilter[]>(["getLocationFilters"], getLocationFiltersApi);

  const isChecked = (filter: LocationFilter) => {
    return filter.topics.every((topic) => locationFilterTopicIds?.includes(topic.id));
  };

  const isCheckedSeoulAll = useMemo<boolean>(
    () => locationFilterTopics.length === data.flatMap((item) => item.topics).length,
    [data, locationFilterTopics.length],
  );

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { value } = e.currentTarget;
    const item = data.find((filter) => filter.id === value);
    if (!item) return;

    const topics = item.topics.map((topic) => topic.id);

    setLocationFilterTopicIds(xor(locationFilterTopics, topics).join(","));
  };

  const onChangeSeoulAll: ChangeEventHandler<HTMLInputElement> = (e) => {
    const { checked } = e.currentTarget;
    if (checked) {
      setLocationFilterTopicIds(
        data
          .flatMap((item) => item.topics)
          .map((topic) => topic.id)
          .join(","),
      );
    } else {
      setLocationFilterTopicIds(null);
    }
  };

  return (
    <CheckMenu className={styles.wrapper}>
      <CheckMenuItem
        key="total"
        wrapperClassName={styles.total}
        checked={isCheckedSeoulAll}
        onChange={onChangeSeoulAll}
      >
        서울 전체
      </CheckMenuItem>
      {data.map((item) => (
        <CheckMenuItem key={item.id} checked={isChecked(item)} value={item.id} onChange={onChange}>
          {item.name}
        </CheckMenuItem>
      ))}
    </CheckMenu>
  );
};

export default Content;

export const LoadingContent: React.FC = () => {
  return <LoadingCheckMenu className={styles.wrapper} />;
};
