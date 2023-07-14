import dynamic from "next/dynamic";

import { LoadingCarousel } from "./Carousel";

export const Carousel = dynamic(() => import("./Carousel"), { loading: () => <LoadingCarousel /> });
export { default as CarouselItem } from "./CarouselItem";
