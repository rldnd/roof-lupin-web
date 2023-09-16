"use client";

import { range } from "lodash-es";

import type { Reservation } from "@/common/types/reservation";
import { UnorderedInfiniteScroll } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateMyReservationsApi } from "@/services/reservation";

import Empty from "./Empty";
import Item, { LoadingItem } from "./Item";

import styles from "./list.module.scss";

const List: React.FC = () => {
  const { data, isSuccess, isFetching, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery<Reservation>(
    ["paginateMyReservations", "isReviewable"],
    ({ pageParam = 1 }) => paginateMyReservationsApi({ page: pageParam, limit: 10, isReviewable: true }),
  );

  return (
    <UnorderedInfiniteScroll
      isSuccess={isSuccess}
      isFetching={isFetching}
      hasNextPage={hasNextPage}
      fetchNextPage={fetchNextPage}
      className={styles.wrapper}
      loadingComponentInList={<LoadingItems />}
      isEmpty={data.pages.length === 0}
      emptyComponent={<Empty />}
    >
      {data.pages.map((reservation) => (
        <Item key={reservation.id} reservation={reservation} className={styles.item} />
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default List;

export const LoadingItems: React.FC = () => {
  return (
    <>
      {range(10).map((value) => (
        <LoadingItem className={styles.item} key={value} />
      ))}
    </>
  );
};

export const LoadingList: React.FC = () => {
  return (
    <ul className={styles.wrapper}>
      <LoadingItems />
    </ul>
  );
};
