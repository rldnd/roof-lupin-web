import dynamic from "next/dynamic";

import { LoadingTimeAndPackage } from "./TimeAndPackage";

export const TimeAndPackage = dynamic(() => import("./TimeAndPackage"), {
  ssr: false,
  loading: () => <LoadingTimeAndPackage />,
});
