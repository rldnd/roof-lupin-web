"use client";

import { MouseEventHandler } from "react";

import { useRouter } from "next/navigation";

import { useMutation } from "@tanstack/react-query";
import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import type { SearchRecord } from "@/common/types/search";
import { HorizonDraggable } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { deleteSearchRecordApi, getSearchRecordsApi } from "@/services/search";

import { IconGrayCloseSmall } from "public/icons";

import styles from "./recentSearch.module.scss";

const RecentSearch: React.FC = () => {
  const { push } = useRouter();
  const { isLogined } = useMe();
  const { data: records, refetch } = useSuspenseQuery<SearchRecord[]>(
    ["getSearchRecords"],
    () => getSearchRecordsApi(),
    { enabled: isLogined },
  );

  const { mutate: deleteSearchRecord } = useMutation(deleteSearchRecordApi, { onSuccess: () => refetch() });

  const onClickDelete: MouseEventHandler<HTMLDivElement> = (e) => {
    e.stopPropagation();
    const id = e.currentTarget.dataset.id as string;
    deleteSearchRecord(id);
  };

  return (
    <section className={styles.wrapper}>
      <h2>최근 검색어</h2>
      <HorizonDraggable component="menu" className={styles.list}>
        {records?.map((record) => (
          <li key={record.id}>
            <button
              type="button"
              className={styles.tagButton}
              onClick={() => push(`/search/results?keyword=${record.content}`)}
            >
              {record.content}
              <div
                role="button"
                tabIndex={0}
                className={styles.deleteButton}
                data-id={record.id}
                onClick={onClickDelete}
              >
                <IconGrayCloseSmall />
              </div>
            </button>
          </li>
        ))}
      </HorizonDraggable>
      {(!isLogined || records.length === 0) && <span className={styles.emptyText}>아직 검색 내역이 없어요</span>}
    </section>
  );
};

export default RecentSearch;

export const LoadingRecentSearch: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <h2>최근 검색어</h2>
      <menu className={styles.list}>
        {range(3).map((value) => (
          <Skeleton key={value} width={60} className={styles.loadingButton} />
        ))}
      </menu>
    </section>
  );
};
