import dynamic from "next/dynamic";

export const SpaceEditReservationInfoFilterBottomSheet = dynamic(
  () => import("./SpaceEditReservationInfoFilterBottomSheet"),
  {
    ssr: false,
  },
);
