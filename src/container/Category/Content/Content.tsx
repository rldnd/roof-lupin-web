"use client";

import { startTransition, useEffect } from "react";

import { notFound, useSearchParams } from "next/navigation";

import { useAtom } from "jotai";
import { range } from "lodash-es";

import { Space } from "@/common/types/space";
import { InfiniteScroll, SpaceBookmark, SpaceDetailCard } from "@/components";
import { LoadingSpaceDetailCard } from "@/components/Space/Card/SpaceDetailCard";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateSpacesApi } from "@/services/space";
import { categorySortMenuState } from "@/states";

import styles from "./content.module.scss";

interface Props {
  ids: string[];
}

const Content: React.FC<Props> = ({ ids }) => {
  const searchParams = useSearchParams();
  const [categorySortMenu, setCategorySortMenu] = useAtom(categorySortMenuState);

  const { data, isFetching, isSuccess, hasNextPage, fetchNextPage, refetch } = useSuspenseInfiniteQuery<Space>(
    ["paginateSpaces", categorySortMenu],
    ({ pageParam = 1 }) => paginateSpacesApi({ page: pageParam, limit: 10, ...categorySortMenu }),
    {
      enabled: Boolean(categorySortMenu.categoryIds),
    },
  );

  useEffect(() => {
    if (!searchParams.get("categoryId") || !ids.includes(searchParams.get("categoryId")!)) notFound();
    startTransition(() => {
      setCategorySortMenu((prev) => ({ ...prev, categoryIds: searchParams.get("categoryId") }));
    });
  }, [ids, searchParams, setCategorySortMenu]);

  return (
    <main className={styles.wrapper}>
      <InfiniteScroll
        className={styles.spaceList}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching || !categorySortMenu.categoryIds}
        isSuccess={isSuccess}
        loadingComponent={<LoadingContent />}
      >
        {data?.pages.map((space) => (
          <SpaceDetailCard className={styles.space} key={space.id} space={space} href={`/spaces/${space.id}`}>
            <SpaceBookmark id={space.id} initialIsInterested={space.isInterested} refetch={refetch} />
          </SpaceDetailCard>
        ))}
      </InfiniteScroll>
    </main>
  );
};

export default Content;

export const LoadingContent: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spaceList}>
        {range(10).map((value) => (
          <LoadingSpaceDetailCard key={value} className={styles.space} />
        ))}
      </div>
    </div>
  );
};
