import dynamic from "next/dynamic";

import { LoadingRecentSearch } from "./RecentSearch";

export { default as Header } from "./Header";
export { LoadingRecentSearch } from "./RecentSearch";
export { default as RecommendSearch } from "./RecommendSearch";
export { default as RecentSpace } from "./RecentSpace";

export const RecentSearch = dynamic(() => import("./RecentSearch"), {
  ssr: false,
  loading: () => <LoadingRecentSearch />,
});
