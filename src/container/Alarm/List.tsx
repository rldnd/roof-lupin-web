"use client";

import type { Alarm } from "@/common/types/alarm";
import { AlarmItem, UnorderedInfiniteScroll } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateAlarmsApi } from "@/services/alarm";

import styles from "./list.module.scss";

const List: React.FC = () => {
  const { data, isSuccess, isFetching, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<Alarm>(
    ["paginateAlarmsApi"],
    ({ pageParam = 1 }) => paginateAlarmsApi({ page: pageParam, limit: 10 }),
  );

  return (
    <UnorderedInfiniteScroll
      isFetching={isFetching}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      isSuccess={isSuccess}
      className={styles.wrapper}
    >
      {data.pages.map((alarm) => (
        <AlarmItem key={alarm.id} alarm={alarm} className={styles.item} />
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default List;
