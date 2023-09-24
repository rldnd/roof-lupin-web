import dynamic from "next/dynamic";

import { LoadingCloseReservation } from "./CloseReservation";
import { LoadingInfo } from "./Info";

export const Info = dynamic(() => import("./Info"), { ssr: false, loading: () => <LoadingInfo /> });
export const CloseReservation = dynamic(() => import("./CloseReservation"), {
  ssr: false,
  loading: () => <LoadingCloseReservation />,
});
export const AppVersionItem = dynamic(() => import("./AppVersionItem"), { ssr: false });

export * from "./Menu";
export { default as Logout } from "./Logout";
