"use client";

import { range } from "lodash-es";

import { Announcement } from "@/common/types/announcement";
import { UnorderedInfiniteScroll } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { getAnnouncementsApi } from "@/services/announcement";

import Item, { LoadingItem } from "./Item";

const List: React.FC = () => {
  const { data, isFetching, hasNextPage, isSuccess, fetchNextPage } = useSuspenseInfiniteQuery<Announcement>(
    ["getAnnouncements"],
    ({ pageParam = 1 }) => getAnnouncementsApi({ page: pageParam, limit: 10 }),
  );

  return (
    <UnorderedInfiniteScroll
      isFetching={isFetching}
      fetchNextPage={fetchNextPage}
      isSuccess={isSuccess}
      hasNextPage={hasNextPage}
      loadingComponent={<LoadingList />}
    >
      {data.pages.map((announcement) => (
        <Item key={announcement.id} announcement={announcement} />
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default List;

export const LoadingList: React.FC = () => {
  return (
    <>
      {range(10).map((value) => (
        <LoadingItem key={value} />
      ))}
    </>
  );
};
