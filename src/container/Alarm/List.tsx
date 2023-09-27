"use client";

import cx from "clsx";
import { range } from "lodash-es";

import type { Alarm } from "@/common/types/alarm";
import { AlarmItem, LoadingAlarmItem, UnorderedInfiniteScroll } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateAlarmsApi } from "@/services/alarm";

import AutoDeleteText from "./AutoDeleteText";
import Empty from "./Empty";

import styles from "./list.module.scss";

const List: React.FC = () => {
  const { data, isSuccess, isFetching, fetchNextPage, hasNextPage } = useSuspenseInfiniteQuery<Alarm>(
    ["paginateAlarmsApi"],
    ({ pageParam = 1 }) => paginateAlarmsApi({ page: pageParam, limit: 10 }),
  );

  return (
    <>
      <UnorderedInfiniteScroll
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        fetchNextPage={fetchNextPage}
        isSuccess={isSuccess}
        emptyComponent={<Empty />}
        isEmpty={data.pages.length === 0}
        className={styles.wrapper}
        loadingComponentInList={<LoadingItems />}
      >
        {data.pages.map((alarm) => (
          <AlarmItem key={alarm.id} alarm={alarm} className={styles.item} />
        ))}
      </UnorderedInfiniteScroll>
      <AutoDeleteText className={cx(styles.autoDeleteText, { [styles.hasAlarm]: data.pages.length > 0 })} />
    </>
  );
};

export default List;

const LoadingItems: React.FC = () => {
  return (
    <>
      {range(10).map((value) => (
        <LoadingAlarmItem key={value} />
      ))}
    </>
  );
};

export const LoadingList: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <LoadingItems />
    </div>
  );
};
