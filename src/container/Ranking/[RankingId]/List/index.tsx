"use client";

import { useParams } from "next/navigation";

import { range } from "lodash-es";

import type { Space } from "@/common/types/space";
import { LoadingSpaceRankCard, OrderedInfiniteScroll, SpaceRankCard } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateRankingSpacesApi } from "@/services/ranking";

import styles from "./rankingList.module.scss";

const RankingList: React.FC = () => {
  const { rankingId } = useParams();
  const { data, fetchNextPage, isFetching, hasNextPage, isSuccess } = useSuspenseInfiniteQuery<Space>(
    ["paginateRankingSpaces"],
    ({ pageParam = 1 }) => paginateRankingSpacesApi({ rankingId, page: pageParam, limit: 10 }),
  );

  return (
    <main className={styles.wrapper}>
      <OrderedInfiniteScroll
        fetchNextPage={fetchNextPage}
        isFetching={isFetching}
        hasNextPage={hasNextPage}
        isSuccess={isSuccess}
        className={styles.list}
        loadingComponent={<LoadingRankingList />}
      >
        {data.pages.map((space, index) => (
          <SpaceRankCard key={space.id} href={`/spaces/${space.id}`} rank={index + 1} space={space} />
        ))}
      </OrderedInfiniteScroll>
    </main>
  );
};

export default RankingList;

export const LoadingRankingList: React.FC = () => {
  return (
    <div className={styles.list}>
      {range(10).map((index) => (
        <LoadingSpaceRankCard key={index} />
      ))}
    </div>
  );
};
