import { Suspense } from "react";

import { getHomeCategoriesApi } from "@/services/home";

import { Content } from "./Content";
import { LoadingContent } from "./Content/Content";
import { Header } from "./Header";
import { TabBar } from "./TabBar";

import styles from "./categoryDetailContainer.module.scss";

export async function generateStaticParams() {
  const categories = await getHomeCategoriesApi();

  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

export default async function CategoryDetailContainer() {
  const categories = await getHomeCategoriesApi();

  return (
    <div className={styles.wrapper}>
      <Header />
      <TabBar categories={categories} />
      <Suspense fallback={<LoadingContent />}>
        <Content />
      </Suspense>
    </div>
  );
}
