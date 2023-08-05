import { TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { ToastPositioner } from "@/components";
import { BottomNavigation } from "@/components/Layout";

import { Header, RecentSearch, RecentSpace, RecommendSearch } from "./_sections";

import styles from "./searchContainer.module.scss";

export default async function SearchContainer() {
  return (
    <ToastPositioner position={TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION}>
      <main className={styles.wrapper}>
        <Header />
        <RecentSearch />
        <RecommendSearch />
        <RecentSpace />
        <BottomNavigation />
      </main>
    </ToastPositioner>
  );
}
