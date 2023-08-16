"use client";

import { useParams } from "next/navigation";

import { range } from "lodash-es";

import type { QnA } from "@/common/types/qna";
import { QnaItem, UnorderedInfiniteScroll } from "@/components";
import { LoadingQnaItem } from "@/components/Qna/QnaItem";
import { useSuspenseInfiniteQuery } from "@/hooks";
import { paginateSpaceQnasApi } from "@/services/qna";

import styles from "./content.module.scss";

const Content: React.FC = () => {
  const { spaceId } = useParams();
  const {
    data: qnas,
    fetchNextPage,
    isFetching,
    isSuccess,
    hasNextPage,
  } = useSuspenseInfiniteQuery<QnA>(["paginateSpaceQnas", spaceId], ({ pageParam = 1 }) =>
    paginateSpaceQnasApi({ spaceId, page: pageParam, limit: 10 }),
  );

  return (
    <UnorderedInfiniteScroll
      fetchNextPage={fetchNextPage}
      isFetching={isFetching}
      isSuccess={isSuccess}
      hasNextPage={hasNextPage}
      className={styles.wrapper}
      loadingComponentInList={<LoadingItems />}
    >
      {qnas.pages.map((qna) => (
        <QnaItem key={qna.id} qna={qna} className={styles.item} />
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default Content;

export const LoadingItems: React.FC = () => {
  return (
    <>
      {range(10).map((value) => (
        <LoadingQnaItem className={styles.item} key={value} />
      ))}
    </>
  );
};

export const LoadingContent: React.FC = () => {
  return (
    <div className={styles.wrapper}>
      <LoadingItems />
    </div>
  );
};
