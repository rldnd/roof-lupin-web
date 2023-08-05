import dynamic from "next/dynamic";

import { LoadingRecentSearch } from "./RecentSearch";
import { LoadingRecentSpace } from "./RecentSpace";

export { default as Header } from "./Header";
export { default as RecommendSearch, LoadingRecommendSearch } from "./RecommendSearch";

export const RecentSearch = dynamic(() => import("./RecentSearch"), {
  ssr: false,
  loading: () => <LoadingRecentSearch />,
});

export const RecentSpace = dynamic(() => import("./RecentSpace"), {
  ssr: false,
  loading: () => <LoadingRecentSpace />,
});
