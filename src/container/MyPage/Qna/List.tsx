"use client";

import { useSearchParams } from "next/navigation";

import { range } from "lodash-es";

import type { QnA } from "@/common/types/qna";
import { LoadingMyQnaItem, MyQnaItem, UnorderedInfiniteScroll } from "@/components";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateMyQnasApi } from "@/services/qna";

import styles from "./list.module.scss";

const List: React.FC = () => {
  const { get } = useSearchParams();
  const isAnswered = get("isAnswered") === "true";

  const { data, hasNextPage, isFetching, isSuccess, fetchNextPage } = useSuspenseInfiniteQuery<QnA>(
    ["paginateMyQnas", isAnswered],
    ({ pageParam = 1 }) => paginateMyQnasApi({ page: pageParam, limit: 10, isAnswered }),
  );

  return (
    <UnorderedInfiniteScroll
      className={styles.wrapper}
      hasNextPage={hasNextPage}
      isFetching={isFetching}
      isSuccess={isSuccess}
      fetchNextPage={fetchNextPage}
      loadingComponentInList={<LoadingItems />}
    >
      {data.pages.map((qna) => (
        <MyQnaItem key={qna.id} qna={qna} className={styles.item} />
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default List;

export const LoadingItems: React.FC = () => {
  return (
    <>
      {range(10).map((value) => (
        <LoadingMyQnaItem key={value} className={styles.item} />
      ))}
    </>
  );
};

export const LoadingList: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <LoadingItems />
    </div>
  );
};
