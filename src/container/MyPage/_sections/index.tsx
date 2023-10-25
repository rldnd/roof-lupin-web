import dynamic from "next/dynamic";

import { LoadingCloseReservation } from "./CloseReservation";
import { LoadingInfo } from "./Info";

export const Info = dynamic(() => import("./Info"), { ssr: false, loading: () => <LoadingInfo /> });
export const CloseReservation = dynamic(() => import("./CloseReservation"), {
  ssr: false,
  loading: () => <LoadingCloseReservation />,
});
export const AppVersionItem = dynamic(() => import("./AppVersionItem"), { ssr: false });
export { default as PartnerButton } from "./PartnerButton";
export { default as ServiceCenterItem } from "./ServiceCenterItem";

export * from "./Menu";
export { default as Logout } from "./Logout";
export { default as KakaoChannelChatItem } from "./KakaoChannelChatItem";
export { default as PolicyItem } from "./PolicyItem";
