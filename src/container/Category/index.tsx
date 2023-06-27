import { Suspense } from "react";

import { SafeArea } from "@/components";
import { getHomeCategoriesApi } from "@/services/home";

import { Content, LoadingContent } from "./Content";
import { Header } from "./Header";
import { TabBar } from "./TabBar";

import styles from "./categoryContainer.module.scss";

export async function generateStaticParams() {
  const categories = await getHomeCategoriesApi();

  return categories.map((category) => ({
    categoryId: category.id,
  }));
}

export default async function CategoryContainer() {
  const categories = await getHomeCategoriesApi();

  return (
    <SafeArea theme="dark">
      <div className={styles.wrapper}>
        <Header />
        <TabBar categories={categories} />
        <Suspense fallback={<LoadingContent />}>
          <Content />
        </Suspense>
      </div>
    </SafeArea>
  );
}
