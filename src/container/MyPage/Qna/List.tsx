"use client";

import { useSearchParams } from "next/navigation";

import type { QnA } from "@/common/types/qna";
import { QnaItem, UnorderedInfiniteScroll } from "@/components";
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
    >
      {data.pages.map((qna) => (
        <QnaItem key={qna.id} qna={qna} />
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default List;

export const LoadingList: React.FC = () => {
  return null;
};
