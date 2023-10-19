"use client";

import { useParams } from "next/navigation";

import { useAtomValue } from "jotai";
import { range } from "lodash-es";
import { useUpdateEffect } from "react-use";

import { Space } from "@/common/types/space";
import { SpaceBookmark, SpaceDetailCard, UnorderedInfiniteScroll } from "@/components";
import { LoadingSpaceDetailCard } from "@/components/Space/Card/SpaceDetailCard";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateSpacesApi } from "@/services/space";
import { spaceSortMenuState } from "@/states";

import Empty from "../Empty";

import styles from "./content.module.scss";

const Content: React.FC = () => {
  const { categoryId } = useParams();
  const spaceSortMenu = useAtomValue(spaceSortMenuState);

  const { data, isFetching, isSuccess, hasNextPage, fetchNextPage } = useSuspenseInfiniteQuery<Space>(
    ["paginateSpaces", "interests", spaceSortMenu, categoryId],
    ({ pageParam = 1 }) =>
      paginateSpacesApi({ page: pageParam, limit: 10, ...spaceSortMenu, categoryIds: categoryId, keyword: null }),
  );

  useUpdateEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [spaceSortMenu]);

  return (
    <main className={styles.wrapper}>
      <UnorderedInfiniteScroll
        className={styles.spaceList}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isEmpty={data.pages.length === 0}
        emptyComponent={<Empty />}
        isFetching={isFetching}
        isSuccess={isSuccess}
        loadingComponentInList={<LoadingContentItems />}
      >
        {data.pages.map((space) => (
          <SpaceDetailCard className={styles.space} key={space.id} space={space} href={`/spaces/${space.id}`}>
            <SpaceBookmark id={space.id} initialIsInterested={space.isInterested} />
          </SpaceDetailCard>
        ))}
      </UnorderedInfiniteScroll>
    </main>
  );
};

export default Content;

export const LoadingContentItems: React.FC = () => {
  return (
    <>
      {range(10).map((value) => (
        <LoadingSpaceDetailCard key={value} className={styles.space} />
      ))}
    </>
  );
};

export const LoadingContent: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.spaceList}>
        <LoadingContentItems />
      </div>
    </div>
  );
};
