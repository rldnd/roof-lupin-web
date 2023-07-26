import { Suspense } from "react";

import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { ToastPositioner } from "@/components";
import { getRankingApi } from "@/services/ranking";

import Header from "./Header";
import RankingList, { LoadingRankingList } from "./List";

import styles from "./rankingListContainer.module.scss";

interface Props {
  params: { rankingId: string };
}

export default async function RankingListContainer({ params }: Props) {
  const ranking = await getRankingApi(params.rankingId);

  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Header title={ranking.name} />
        <Suspense fallback={<LoadingRankingList />}>
          <RankingList />
        </Suspense>
      </div>
    </ToastPositioner>
  );
}
