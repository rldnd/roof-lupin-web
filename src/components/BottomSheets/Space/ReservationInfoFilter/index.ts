import dynamic from "next/dynamic";

export const SpaceReservationInfoFilterBottomSheet = dynamic(() => import("./SpaceReservationInfoFilterBottomSheet"), {
  ssr: false,
});
