import { Suspense } from "react";

import { TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { ToastPositioner } from "@/components";
import { getSpaceRentalTypeDetailApi } from "@/services/rentalType";
import { getServerSpaceApi } from "@/services/space";

import {
  BestPhoto,
  Building,
  Carousel,
  CarouselItem,
  Caution,
  EmptyReview,
  Footer,
  Header,
  Introduction,
  LoadingCarousel,
  Location,
  MenuItem,
  OpenHourAndHoliday,
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

export default async function SpaceDetailContainer({ params }: Props) {
  const spacePromise = getServerSpaceApi(params.spaceId);
  const spaceRentalTypePromise = getSpaceRentalTypeDetailApi(params.spaceId);

  const [space, spaceRentalType] = await Promise.all([spacePromise, spaceRentalTypePromise]);

  return (
    <ToastPositioner position={TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION}>
      <main className={styles.wrapper}>
        <Header space={space} />
        <Suspense fallback={<LoadingCarousel />}>
          <Carousel slideCount={space.images.length}>
            {space.images.map((image) => (
              <CarouselItem key={image.url} image={image} spaceId={params.spaceId} />
            ))}
          </Carousel>
        </Suspense>
        <Introduction space={space} />
        <TabBar />
        <hr id="tab-bar-horizon" className={styles.tabBarHorizon} />
        <Price rentalType={spaceRentalType} spaceId={params.spaceId} />
        <hr />
        <BestPhoto bestPhotos={space.bestPhotos} />
        <hr />
        <Service services={space.services} />
        <hr />
        <Building buildings={space.buildings} sizes={space.sizes} />
        <hr />
        <Caution caution={space.caution} />
        <hr />
        {space.location && (
          <>
            <Location
              location={space.location}
              publicTransportations={space.publicTransportations}
              categories={space.categories}
            />
            <hr />
          </>
        )}
        {space.reviews.length === 0 && <EmptyReview />}
        {space.reviews.length !== 0 && (
          <Review averageScore={space.averageScore} reviewCount={space.reviewCount} reviews={space.reviews} />
        )}
        <hr />
        <MenuItem title={`Q&A (${space.qnaCount})`} href={`/spaces/${params.spaceId}/qnas`} />
        <hr />
        <Refund refundPolicies={space.refundPolicies} />
        <hr />
        <OpenHourAndHoliday openHours={space.openHours} holidays={space.holidays} />
        <hr />
        <MenuItem title="호스트 정보" href={`/spaces/${params.spaceId}/hosts`} />
        <hr />
        <ReportButton />
        <Footer
          maxUser={space.maxUser}
          overflowUserCount={space.overflowUserCount}
          overflowUserCost={space.overflowUserCost}
        />
      </main>
    </ToastPositioner>
  );
}
