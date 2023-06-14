import { getSpaceRentalTypeApi } from "@/services/rentalType";
import { getSpaceApi } from "@/services/space";

import Carousel from "./Carousel";
import Header from "./Header";

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
      <Header />
      <Carousel />
    </main>
  );
}
