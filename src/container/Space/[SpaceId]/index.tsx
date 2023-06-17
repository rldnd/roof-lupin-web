import { Suspense } from "react";

import { SafeArea } from "@/components";
import { getSpaceRentalTypeDetailApi } from "@/services/rentalType";
import { getBestReviewsApi } from "@/services/review";
import { getSpaceApi, getSpaceIdsApi } from "@/services/space";

import {
  BestPhoto,
  Building,
  Carousel,
  CarouselItem,
  Caution,
  Facility,
  Header,
  Introduction,
  LoadingBestPhoto,
  Location,
  MenuItem,
  Price,
  ReportButton,
  Review,
  TabBar,
} from "./Common";

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
        <Facility facilities={space.facilities} services={space.services} />
        <hr />
        <Building />
        <hr />
        <Caution cautions={space.cautions} />
        <hr />
        <Location />
        <hr />
        <Review />
        <hr />
        <MenuItem title="Q&A" href="/" />
        <hr />
        <section>
          <h2>취소 및 환불 정책</h2>
        </section>
        <hr />
        <MenuItem title="판매자 정보" href="/" />
        <hr />
        <ReportButton />
      </main>
    </SafeArea>
  );
}
