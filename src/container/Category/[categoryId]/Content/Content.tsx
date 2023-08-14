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
import { categorySortMenuState } from "@/states";

import styles from "./content.module.scss";

const Content: React.FC = () => {
  const { categoryId } = useParams();
  const categorySortMenu = useAtomValue(categorySortMenuState);

  const { data, isFetching, isSuccess, hasNextPage, fetchNextPage, refetch } = useSuspenseInfiniteQuery<Space>(
    ["paginateSpaces", categorySortMenu, categoryId],
    ({ pageParam = 1 }) =>
      paginateSpacesApi({ page: pageParam, limit: 10, ...categorySortMenu, categoryIds: categoryId }),
  );

  useUpdateEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [categorySortMenu]);

  return (
    <main className={styles.wrapper}>
      <UnorderedInfiniteScroll
        className={styles.spaceList}
        fetchNextPage={fetchNextPage}
        hasNextPage={hasNextPage}
        isFetching={isFetching}
        isSuccess={isSuccess}
        loadingComponentInList={<LoadingContentItems />}
      >
        {data.pages.map((space) => (
          <SpaceDetailCard className={styles.space} key={space.id} space={space} href={`/spaces/${space.id}`}>
            <SpaceBookmark id={space.id} initialIsInterested={space.isInterested} refetch={refetch} />
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