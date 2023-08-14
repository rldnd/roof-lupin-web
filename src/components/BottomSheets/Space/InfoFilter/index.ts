import dynamic from "next/dynamic";

export const SpaceInfoFilterBottomSheet = dynamic(() => import("./SpaceInfoFilterBottomSheet"), {
  ssr: false,
});
