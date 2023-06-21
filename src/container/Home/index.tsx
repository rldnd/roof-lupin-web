import { lazy, Suspense } from "react";

import dynamic from "next/dynamic";

import { SafeArea, SpaceCard } from "@/components";
import { BottomNavigation } from "@/components/Layout";
import { getHomeCategoriesApi, getHomeContentsApi, getHomeCurationsApi } from "@/services/home";

import Bookmark from "./Bookmark";
import { LoadingCarousel } from "./Carousel";
import CarouselItem from "./CarouselItem";
import Category from "./Category";
import ContentList from "./ContentList";

import styles from "./homeContainer.module.scss";

const Header = dynamic(() => import("./Header"), { ssr: false });
const Carousel = lazy(() => import("./Carousel"));

export default async function HomeContainer() {
  const curationsPromise = getHomeCurationsApi();
  const categoriesPromise = getHomeCategoriesApi();
  const contentsPromise = getHomeContentsApi();

  const [curations, categories, contents] = await Promise.all([curationsPromise, categoriesPromise, contentsPromise]);

  return (
    <SafeArea>
      <main className={styles.wrapper}>
        <Header />
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
                <SpaceCard key={space.id} space={space} href={`/spaces/${space.id}`}>
                  <Bookmark space={space} />
                </SpaceCard>
              ))}
            </ContentList>
          );
        })}
        <BottomNavigation />
      </main>
    </SafeArea>
  );
}
