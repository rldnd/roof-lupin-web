import { Suspense } from "react";

import { SafeArea } from "@/components";
import { getHomeCategoriesApi } from "@/services/home";

import { Content, LoadingContent } from "./Content";
import Filter from "./Filter";
import { Header } from "./Header";
import { TabBar } from "./TabBar";

import styles from "./categoryContainer.module.scss";

export default async function CategoryContainer() {
  const categories = await getHomeCategoriesApi();
  const ids = categories.map((category) => category.id);

  return (
    <SafeArea theme="dark">
      <div className={styles.wrapper}>
        <Header />
        <TabBar categories={categories} />
        <Filter />
        <Suspense fallback={<LoadingContent />}>
          <Content ids={ids} />
        </Suspense>
      </div>
    </SafeArea>
  );
}
