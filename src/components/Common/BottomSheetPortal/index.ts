import dynamic from "next/dynamic";

export const BottomSheetPortal = dynamic(() => import("./BottomSheetPortal"), { ssr: false });
export { default as BaseBottomSheet } from "./BaseBottomSheet";
