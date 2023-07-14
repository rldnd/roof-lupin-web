import { lazy } from "react";

export const Carousel = lazy(() => import("./Carousel"));

export { LoadingCarousel } from "./Carousel";
export { default as CarouselItem } from "./CarouselItem";
