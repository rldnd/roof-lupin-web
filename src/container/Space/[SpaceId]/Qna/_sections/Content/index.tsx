"use client";

import { useParams } from "next/navigation";

import type { QnA } from "@/common/types/qna";
import { QnaItem, UnorderedInfiniteScroll } from "@/components";
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
    >
      {qnas.pages.map((qna) => (
        <QnaItem key={qna.id} qna={qna} className={styles.item} />
      ))}
    </UnorderedInfiniteScroll>
  );
};

export default Content;

export const LoadingContent: React.FC = () => {
  return null;
};
