"use client";

import { Fragment } from "react";

import type { Space } from "@/common/types/space";
import { InfiniteScroll } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateSpaceInterestsApi } from "@/services/space";

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
    <InfiniteScroll
      className={styles.wrapper}
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      isSuccess={isSuccess}
      hasNextPage={hasNextPage}
    >
      {interests.pages.map((interest, idx) => (
        <Fragment key={idx}>sdf</Fragment>
      ))}
    </InfiniteScroll>
  );
};

export default InterestList;
