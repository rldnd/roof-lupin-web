import { Suspense } from "react";

import { getSpaceRentalTypesApi } from "@/services/rentalType";
import { getSpaceApi, getSpaceIdsApi } from "@/services/space";

import BestPhoto from "./BestPhoto";
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
  const spaceRentalTypesPromise = getSpaceRentalTypesApi(params.spaceId);

  const [space, spaceRentalTypes] = await Promise.all([spacePromise, spaceRentalTypesPromise]);

  return (
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
      <Price rentalTypes={spaceRentalTypes} />
      <hr />
      <BestPhoto />
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
  );
}
