"use client";

import { useSearchParams } from "next/navigation";

import { range } from "lodash-es";

import { MY_RESERVATION_TAB_MAPPER } from "@/common/constants/reservation";
import type { Reservation } from "@/common/types/reservation";
import { LoadingSpaceReservationCard, SpaceReservationCard, UnorderedInfiniteScroll } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateMyReservationsApi } from "@/services/reservation";

import styles from "./list.module.scss";

const List: React.FC = () => {
  const { get } = useSearchParams();
  const tab = get("tab");

  const activeTab =
    tab === MY_RESERVATION_TAB_MAPPER.isUsed
      ? MY_RESERVATION_TAB_MAPPER.isUsed
      : tab === MY_RESERVATION_TAB_MAPPER.isCanceled
      ? MY_RESERVATION_TAB_MAPPER.isCanceled
      : MY_RESERVATION_TAB_MAPPER.isApproaching;

  const { data, hasNextPage, fetchNextPage, isSuccess, isFetching } = useSuspenseInfiniteQuery<Reservation>(
    ["paginateMyReservations", activeTab],
    ({ pageParam = 1 }) => paginateMyReservationsApi({ page: pageParam, limit: 10, [activeTab]: true }),
  );

  return (
    <UnorderedInfiniteScroll
      hasNextPage={hasNextPage}
      isSuccess={isSuccess}
      isFetching={isFetching}
      className={styles.wrapper}
      fetchNextPage={fetchNextPage}
      loadingComponent={<LoadingList />}
    >
      {data.pages.map((reservation) => (
        <li key={reservation.id}>
          <SpaceReservationCard reservation={reservation} href={`/reservations/${reservation.id}`} />
        </li>
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default List;

export const LoadingList: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      {range(10).map((value) => (
        <LoadingSpaceReservationCard key={value} />
      ))}
    </div>
  );
};
