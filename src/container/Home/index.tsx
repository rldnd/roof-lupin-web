import { TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { SpaceCard, ToastPositioner } from "@/components";
import { BottomNavigation, Footer } from "@/components/Layout";
import { getHomeCategoriesApi, getHomeContentsApi, getHomeCurationsApi } from "@/services/home";

import { Carousel, CarouselItem } from "./Carousel";
import Category from "./Category";
import { ContentBookmark, ContentList } from "./Content";
import Exhibition from "./Exhibition";
import { Header } from "./Header";
import Ranking from "./Ranking";

import styles from "./homeContainer.module.scss";

export default async function HomeContainer() {
  const curationsPromise = getHomeCurationsApi();
  const categoriesPromise = getHomeCategoriesApi();
  const contentsPromise = getHomeContentsApi();

  const [curations, categories, contents] = await Promise.all([curationsPromise, categoriesPromise, contentsPromise]);

  return (
    <ToastPositioner position={TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION}>
      <main className={styles.wrapper}>
        <Header />
        <Carousel slideCount={curations.length}>
          {curations.map((curation) => (
            <CarouselItem key={curation.id} curation={curation} />
          ))}
        </Carousel>
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
            return <Exhibition key={content.id} exhibition={content.exhibition} />;
          }

          if (content.type === "RANKING") {
            return <Ranking key={content.id} ranking={content.ranking} />;
          }
        })}

        <Footer />
        <BottomNavigation />
      </main>
    </ToastPositioner>
  );
}
