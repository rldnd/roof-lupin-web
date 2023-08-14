"use client";

import { useRouter } from "next/navigation";

import { range } from "lodash-es";
import Skeleton from "react-loading-skeleton";

import type { SearchRecommend } from "@/common/types/search";
import { HorizonDraggable } from "@/components";
import { useSuspenseQuery } from "@/hooks";
import { getSearchRecommendsApi } from "@/services/search";

import { IconInfo } from "public/icons";

import styles from "./recommendSearch.module.scss";

const RecommendSearch: React.FC = () => {
  const { push } = useRouter();
  const { data: recommends } = useSuspenseQuery<SearchRecommend[]>(["getSearchRecommends"], () =>
    getSearchRecommendsApi(),
  );

  return (
    <section className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2>루프루팡 추천 검색어</h2>
        <button type="button">
          <IconInfo />
        </button>
      </div>
      <HorizonDraggable component="menu" className={styles.list}>
        {recommends.map((recommend) => (
          <li key={recommend.id}>
            <button
              type="button"
              className={styles.tagButton}
              onClick={() => push(`/search/results?keyword=${encodeURIComponent(recommend.content)}`)}
            >
              {recommend.content}
            </button>
          </li>
        ))}
      </HorizonDraggable>
    </section>
  );
};

export default RecommendSearch;

export const LoadingRecommendSearch: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <div className={styles.titleWrapper}>
        <h2>루프루팡 추천 검색어</h2>
        <button type="button">
          <IconInfo />
        </button>
      </div>
      <menu className={styles.list}>
        {range(3).map((value) => (
          <Skeleton width={60} className={styles.loadingButton} key={value} />
        ))}
      </menu>
    </section>
  );
};
