import { Suspense } from "react";

import { SafeArea } from "@/components";
import { getSpaceRentalTypeDetailApi } from "@/services/rentalType";
import { getSpaceApi, getSpaceIdsApi } from "@/services/space";

import {
  BestPhoto,
  Building,
  Carousel,
  CarouselItem,
  Caution,
  Header,
  Introduction,
  LoadingCarousel,
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

// TODO: 문의하기 구현
// TODO: Q&A 구현
// TODO: 지도 구현
// TODO: 리뷰 페이지 구현
// TODO: 판매자 정보 구현
export default async function SpaceDetailContainer({ params }: Props) {
  const spacePromise = getSpaceApi(params.spaceId);
  const spaceRentalTypePromise = getSpaceRentalTypeDetailApi(params.spaceId);

  const [space, spaceRentalType] = await Promise.all([spacePromise, spaceRentalTypePromise]);

  return (
    <SafeArea top theme="dark">
      <main className={styles.wrapper}>
        <Header space={space} />
        <Suspense fallback={<LoadingCarousel />}>
          <Carousel slideCount={space.images.length}>
            {space.images.map((image) => (
              <CarouselItem key={image.url} image={image} />
            ))}
          </Carousel>
        </Suspense>
        <Introduction space={space} />
        <TabBar />
        <hr id="tab-bar-horizon" className={styles.tabBarHorizon} />
        <Price rentalType={spaceRentalType} />
        <hr />
        <BestPhoto bestPhotos={space.bestPhotos} />
        <hr />
        <Service services={space.services} />
        <hr />
        <Building buildings={space.buildings} sizes={space.sizes} />
        <hr />
        <Caution cautions={space.cautions} />
        <hr />
        <Location />
        <hr />
        <Review averageScore={space.averageScore} reviewCount={space.reviewCount} reviews={space.reviews} />
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
