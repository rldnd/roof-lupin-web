import dynamic from "next/dynamic";

import { LoadingEventSection } from "./EventSection";
import { LoadingTopSection } from "./TopSection";

export const TopSection = dynamic(() => import("./TopSection"), {
  ssr: false,
  loading: () => <LoadingTopSection />,
});

export const EventSection = dynamic(() => import("./EventSection"), {
  ssr: false,
  loading: () => <LoadingEventSection />,
});
