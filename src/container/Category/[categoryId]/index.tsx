import { TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { ToastPositioner } from "@/components";
import { getHomeCategoriesApi } from "@/services/home";

import { Content } from "./Content";
import { Filter } from "./Filter";
import { Header } from "./Header";
import TabBar from "./TabBar";

import styles from "./categoryContainer.module.scss";

export default async function CategoryDetailContainer() {
  const categories = await getHomeCategoriesApi();

  return (
    <ToastPositioner position={TOAST_BOTTOM_WITHOUT_BOTTOM_NAVIGATION}>
      <div className={styles.wrapper}>
        <Header />
        <TabBar categories={categories} />
        <Filter />
        <Content />
      </div>
    </ToastPositioner>
  );
}
