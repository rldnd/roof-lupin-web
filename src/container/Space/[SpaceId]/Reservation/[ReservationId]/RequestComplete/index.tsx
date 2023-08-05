import dynamic from "next/dynamic";

import { getServerSpaceApi } from "@/services/space";

import { LoadingBottomSection } from "./BottomSection";
import Header from "./Header";
import TopSection from "./TopSection";

import styles from "./requestReservationCompleteContainer.module.scss";

const BottomSection = dynamic(() => import("./BottomSection"), { ssr: false, loading: () => <LoadingBottomSection /> });

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
        <BottomSection />
      </main>
    </div>
  );
}
