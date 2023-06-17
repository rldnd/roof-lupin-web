import { Suspense } from "react";

import { SafeArea } from "@/components";
import { getSpaceRentalTypeDetailApi } from "@/services/rentalType";
import { getBestReviewsApi } from "@/services/review";
import { getSpaceApi, getSpaceIdsApi } from "@/services/space";

import BestPhoto, { LoadingBestPhoto } from "./BestPhoto";
import Building from "./Building";
import { Carousel, CarouselItem } from "./Carousel";
import Caution from "./Caution";
import Facility from "./Facility";
import Header from "./Header";
import Introduction from "./Introduction";
import Location from "./Location";
import Price from "./Price";
import Review from "./Review";
import TabBar from "./TabBar";

import styles from "./spaceDetailContainer.module.scss";

interface Props {
  params: { spaceId: string };
}

export async function generateStaticParams() {
  const { ids } = await getSpaceIdsApi();

  return ids.map((id) => ({
    spaceId: id,
  }));
}

export default async function SpaceDetailContainer({ params }: Props) {
  const spacePromise = getSpaceApi(params.spaceId);
  const spaceRentalTypePromise = getSpaceRentalTypeDetailApi(params.spaceId);
  const bestReviewsPromise = getBestReviewsApi(params.spaceId);

  const [space, spaceRentalType] = await Promise.all([spacePromise, spaceRentalTypePromise]);

  return (
    <SafeArea top theme="dark">
      <main className={styles.wrapper}>
        <Header space={space} />
        <Carousel slideCount={space.images.length}>
          {space.images.map((image) => (
            <CarouselItem key={image.url} image={image} />
          ))}
        </Carousel>
        <Introduction space={space} />
        <Suspense fallback={null}>
          <TabBar />
        </Suspense>
        <hr id="tab-bar-horizon" className={styles.tabBarHorizon} />
        <Price rentalType={spaceRentalType} />
        <hr />
        <Suspense fallback={<LoadingBestPhoto />}>
          {/* @ts-expect-error Server Component */}
          <BestPhoto bestReviewsPromise={bestReviewsPromise} />
        </Suspense>
        <hr />
        <Facility />
        <hr />
        <Building />
        <hr />
        <Caution />
        <hr />
        <Location />
        <hr />
        <Review />
      </main>
    </SafeArea>
  );
}
