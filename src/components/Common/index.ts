import dynamic from "next/dynamic";

export const ModalPortal = dynamic(() => import("./ModalPortal"), { ssr: false });

export * from "./BottomSheetPortal";
export { default as ArrowButton } from "./ArrowButton";
export { default as ArrowLink } from "./ArrowLink";
export { default as Button } from "./Button";
export { default as Tag } from "./Tag";
