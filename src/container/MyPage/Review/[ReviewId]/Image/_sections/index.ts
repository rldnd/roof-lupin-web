import dynamic from "next/dynamic";

export { default as Header } from "./Header";
export { default as Carousel, LoadingCarousel } from "./Carousel";

export const Review = dynamic(() => import("./Review"), { ssr: false });
