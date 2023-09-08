import dynamic from "next/dynamic";

import Header from "./Header";
import { LoadingTopSection } from "./TopSection";

import styles from "./writeReviewContainer.module.scss";

const TopSection = dynamic(() => import("./TopSection"), { ssr: false, loading: () => <LoadingTopSection /> });

export default async function WriteReviewContainer() {
  return (
    <div className={styles.wrapper}>
      <Header />
      <TopSection />
    </div>
  );
}
