import dynamic from "next/dynamic";

import { LoadingLocation } from "./Location";

export * from "./_shared";
export { default as BestPhoto } from "./BestPhoto";
export { default as Building } from "./Building";
export * from "./Carousel";
export { default as Caution } from "./Caution";
export { default as Service } from "./Service";
export * from "./Header";
export { default as Introduction } from "./Introduction";
export { default as Price } from "./Price";
export { default as ReportButton } from "./ReportButton";
export { Review, EmptyReview } from "./Review";
export { default as TabBar } from "./TabBar";
export { default as Refund } from "./Refund";
export { default as OpenHourAndHoliday } from "./OpenHourAndHoliday";

export const Location = dynamic(() => import("./Location"), { ssr: false, loading: () => <LoadingLocation /> });
export { Footer } from "./Footer";
