import { Suspense } from "react";

import { SpaceCard } from "@/components";
import { BottomNavigation, Footer } from "@/components/Layout";
import { getHomeCategoriesApi, getHomeContentsApi, getHomeCurationsApi } from "@/services/home";

import { Carousel, CarouselItem, Category, ContentBookmark, ContentList, Header, LoadingCarousel } from "./_sections";

import styles from "./homeContainer.module.scss";

export default async function HomeContainer() {
  const curationsPromise = getHomeCurationsApi();
  const categoriesPromise = getHomeCategoriesApi();
  const contentsPromise = getHomeContentsApi();

  const [curations, categories, contents] = await Promise.all([curationsPromise, categoriesPromise, contentsPromise]);

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
      <Category categories={categories} />
      {contents.map((content) => {
        if (content.type === "CONTENTS") {
          const { id, highlight, name, spaces } = content.contentCategory;
          return (
            <ContentList key={content.id} content={{ id, name, highlight }}>
              {spaces.map((space) => (
                <SpaceCard key={space.id} space={space} href={`/spaces/${space.id}`}>
                  <ContentBookmark space={space} />
                </SpaceCard>
              ))}
            </ContentList>
          );
        }

        if (content.type === "EXHIBITION") {
          const { title } = content.exhibition;
          return <h1 key={content.id}>기획전 개발 필요:{title}</h1>;
        }

        if (content.type === "RANKING") {
          const { name } = content.ranking;
          return <h1 key={content.id}>랭킹 개발 필요:{name}</h1>;
        }
      })}
      <Footer />
      <BottomNavigation />
    </main>
  );
}
