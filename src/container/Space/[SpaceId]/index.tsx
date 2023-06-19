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
  Header,
  Introduction,
  LoadingBestPhoto,
  Location,
  MenuItem,
  Price,
  Refund,
  ReportButton,
  Review,
  Service,
  TabBar,
} from "./_sections";

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
        <Service services={space.services} />
        <hr />
        <Building buildings={space.buildings} sizes={space.sizes} />
        <hr />
        <Caution cautions={space.cautions} />
        <hr />
        <Location />
        <hr />
        <Review reviews={space.reviews} reviewCount={space.reviewCount} score={space.averageScore} />
        <hr />
        <MenuItem title={`Q&A (${space.qnaCount})`} href="/" />
        <hr />
        <Refund refundPolicies={space.refundPolicies} />
        <hr />
        <MenuItem title="판매자 정보" href="/" />
        <hr />
        <ReportButton />
      </main>
    </SafeArea>
  );
}
