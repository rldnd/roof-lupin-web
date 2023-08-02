import { Suspense } from "react";

import { getServerSpaceApi } from "@/services/space";

import BottomSection, { LoadingBottomSection } from "./BottomSection";
import Header from "./Header";
import TopSection from "./TopSection";

import styles from "./requestReservationCompleteContainer.module.scss";

interface Props {
  params: { spaceId: string };
}

export default async function RequestReservationCompleteContainer({ params }: Props) {
  const space = await getServerSpaceApi(params.spaceId);

  return (
    <div className={styles.wrapper}>
      <Header />
      <main className={styles.content}>
        <TopSection space={space} />
        <hr />
        <Suspense fallback={<LoadingBottomSection />}>
          <BottomSection />
        </Suspense>
      </main>
    </div>
  );
}
