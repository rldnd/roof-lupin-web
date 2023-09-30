import dynamic from "next/dynamic";

import { LoadingAppPermissionSection } from "./AppPermissionSection";

export { default as EventSection } from "./EventSection";

export const AppPermissionSection = dynamic(() => import("./AppPermissionSection"), {
  ssr: false,
  loading: () => <LoadingAppPermissionSection />,
});
