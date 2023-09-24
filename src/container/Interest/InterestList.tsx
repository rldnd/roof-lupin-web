"use client";

import { range } from "lodash-es";

import type { Space } from "@/common/types/space";
import { LoadingSpaceCardTwoColumns, SpaceCardTwoColumns, UnorderedInfiniteScroll } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateSpaceInterestsApi } from "@/services/space";

import Bookmark from "./Bookmark";
import Empty from "./Empty";

import styles from "./interestList.module.scss";

const InterestList: React.FC = () => {
  const {
    data: interests,
    fetchNextPage,
    isFetching,
    isSuccess,
    hasNextPage,
  } = useSuspenseInfiniteQuery<Space>(["paginateSpaceInterests"], ({ pageParam = 1 }) =>
    paginateSpaceInterestsApi({ page: pageParam, limit: 10 }),
  );

  return (
    <UnorderedInfiniteScroll
      className={styles.wrapper}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      isSuccess={isSuccess}
      isEmpty={interests.pages.length === 0}
      emptyComponent={<Empty />}
      hasNextPage={hasNextPage}
      loadingComponentInList={<LoadingInterestItems />}
    >
      {interests.pages.map((interest) => (
        <SpaceCardTwoColumns key={interest.id} space={interest} href={`/spaces/${interest.id}`}>
          <Bookmark isInterested={interest.isInterested} spaceId={interest.id} />
        </SpaceCardTwoColumns>
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default InterestList;

export const LoadingInterestItems: React.FC = () => {
  return (
    <>
      {range(10).map((value) => (
        <LoadingSpaceCardTwoColumns key={value} />
      ))}
    </>
  );
};

export const LoadingInterestList: React.FC = () => {
  return (
    <ol className={styles.wrapper}>
      <LoadingInterestItems />
    </ol>
  );
};
