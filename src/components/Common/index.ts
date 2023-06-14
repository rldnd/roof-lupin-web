import dynamic from "next/dynamic";

export const ModalPortal = dynamic(() => import("./ModalPortal"), { ssr: false });
export const BottomSheetPortal = dynamic(() => import("./BottomSheetPortal"), { ssr: false });

export { default as ArrowButton } from "./ArrowButton";
export { default as ArrowLink } from "./ArrowLink";
export { default as BestTag } from "./BestTag";
export { default as Button } from "./Button";
