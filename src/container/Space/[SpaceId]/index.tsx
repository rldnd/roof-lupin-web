import { getSpaceRentalTypeApi } from "@/services/rentalType";
import { getSpaceApi } from "@/services/space";

import Carousel from "./Carousel";
import CarouselItem from "./CarouselItem";
import Header from "./Header";
import Introduction from "./Introduction";

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
      <hr />
      <div style={{ height: 2000 }} />
    </main>
  );
}
