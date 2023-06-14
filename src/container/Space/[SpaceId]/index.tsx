import { Suspense } from "react";

import { getSpaceRentalTypeApi } from "@/services/rentalType";
import { getSpaceApi } from "@/services/space";

import BestPhoto from "./BestPhoto";
import Building from "./Building";
import { Carousel, CarouselItem } from "./Carousel";
import Caution from "./Caution";
import Facility from "./Facility";
import Header from "./Header";
import Introduction from "./Introduction";
import Map from "./Map";
import Price from "./Price";
import Review from "./Review";
import TabBar from "./TabBar";

import styles from "./spaceDetailContainer.module.scss";

interface Props {
  params: { spaceId: string };
}

export default async function SpaceDetailContainer({ params }: Props) {
  const spacePromise = getSpaceApi(params.spaceId);
  const spaceRentalTypePromise = getSpaceRentalTypeApi(params.spaceId);

  const [space, spaceRentalType] = await Promise.all([spacePromise, spaceRentalTypePromise]);

  return (
    <main className={styles.wrapper}>
      <Header space={space} />
      <Carousel slideCount={space.images.length}>
        {space.images.map((image) => (
          <CarouselItem key={image.url} image={image} />
        ))}
      </Carousel>
      <Introduction space={space} />
      <TabBar />
      <hr id="tab-bar-horizon" className={styles.tabBarHorizon} />
      <Price />
      <hr />
      <BestPhoto />
      <hr />
      <Facility />
      <hr />
      <Building />
      <hr />
      <Caution />
      <hr />
      <Map />
      <hr />
      <Review />
    </main>
  );
}
