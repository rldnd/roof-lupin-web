import dynamic from "next/dynamic";

import { LoadingAppPermissionSection } from "./AppPermissionSection";
import { LoadingEventSection } from "./EventSection";

export const AppPermissionSection = dynamic(() => import("./AppPermissionSection"), {
  ssr: false,
  loading: () => <LoadingAppPermissionSection />,
});

export const EventSection = dynamic(() => import("./EventSection"), {
  ssr: false,
  loading: () => <LoadingEventSection />,
});
