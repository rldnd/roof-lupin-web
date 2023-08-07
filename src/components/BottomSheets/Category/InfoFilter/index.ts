import dynamic from "next/dynamic";

export const CategoryInfoFilterBottomSheet = dynamic(() => import("./CategoryInfoFilterBottomSheet"), {
  ssr: false,
});
