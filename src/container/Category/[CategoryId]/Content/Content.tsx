"use client";

import { useAtomValue } from "jotai";

import { Space } from "@/common/types/space";
import { InfiniteScroll, SpaceDetailCard } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateSpacesApi } from "@/services/space";
import { categorySortMenuState } from "@/states/category";

import Bookmark from "./Bookmark";

import styles from "./content.module.scss";

const Content: React.FC = () => {
  const categorySortMenu = useAtomValue(categorySortMenuState);

  const { data, isFetching, isSuccess, hasNextPage, fetchNextPage, refetch } = useSuspenseInfiniteQuery<Space>(
    ["paginateSpaces", categorySortMenu],
    ({ pageParam = 1 }) => paginateSpacesApi({ page: pageParam, limit: 10, ...categorySortMenu }),
    {
      // enabled: Boolean(categorySortMenu.category),
    },
  );

  return (
    <main className={styles.wrapper}>
      <InfiniteScroll
        className={styles.spaceList}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        isSuccess={isSuccess}
      >
        {data.pages.map((space) => (
          <SpaceDetailCard key={space.id} space={space} href={`/spaces/${space.id}`}>
            <Bookmark id={space.id} initialIsInterested={space.isInterested} refetch={refetch} />
          </SpaceDetailCard>
        ))}
      </InfiniteScroll>
    </main>
  );
};

export default Content;
