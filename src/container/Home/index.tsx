import { Suspense } from "react";

import { getHomeCategoriesApi } from "@/services/category";
import { getHomeCurationsApi } from "@/services/curation";

import Carousel, { LoadingCarousel } from "./Carousel";
import CarouselItem from "./CarouselItem";
import Category from "./Category";
import Header from "./Header";

import styles from "./homeContainer.module.scss";

export default async function HomeContainer() {
  const curationsPromise = getHomeCurationsApi();
  const categoriesPromise = getHomeCategoriesApi();

  const [curations, categories] = await Promise.all([curationsPromise, categoriesPromise]);

  return (
    <main className={styles.wrapper}>
      <Header />
      <Suspense fallback={<LoadingCarousel />}>
        <Carousel slideCount={curations.length}>
          {curations.map((curation) => (
            <CarouselItem key={curation.id} curation={curation} />
          ))}
        </Carousel>
      </Suspense>
      <div className={styles.content}>
        <Category categories={categories} />
      </div>
    </main>
  );
}
