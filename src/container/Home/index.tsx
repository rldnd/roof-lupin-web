import { Suspense } from "react";

import { SafeArea } from "@/components";
import BottomNavigation from "@/components/Common/BottomNavigation";
import SpaceCard from "@/components/SpaceCard/SpaceCard";
import { getHomeCategoriesApi, getHomeContentsApi, getHomeCurationsApi } from "@/services/home";

import Carousel, { LoadingCarousel } from "./Carousel";
import CarouselItem from "./CarouselItem";
import Category from "./Category";
import ContentList from "./ContentList";
import Header from "./Header";

import styles from "./homeContainer.module.scss";

export default async function HomeContainer() {
  const curationsPromise = getHomeCurationsApi();
  const categoriesPromise = getHomeCategoriesApi();
  const contentsPromise = getHomeContentsApi();

  const [curations, categories, contents] = await Promise.all([curationsPromise, categoriesPromise, contentsPromise]);

  return (
    <SafeArea>
      <main className={styles.wrapper}>
        <Suspense fallback={null}>
          <Header />
        </Suspense>
        <Suspense fallback={<LoadingCarousel />}>
          <Carousel slideCount={curations.length}>
            {curations.map((curation) => (
              <CarouselItem key={curation.id} curation={curation} />
            ))}
          </Carousel>
        </Suspense>
        <Category categories={categories} />
        {contents.map((content) => {
          const { id, name, highlight, spaces } = content;
          return (
            <ContentList key={content.id} content={{ id, name, highlight }}>
              {spaces.map((space) => (
                <SpaceCard key={space.id} space={space} href={`/spaces/${space.id}`} />
              ))}
            </ContentList>
          );
        })}
        <BottomNavigation />
      </main>
    </SafeArea>
  );
}
