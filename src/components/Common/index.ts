import dynamic from "next/dynamic";
export const ModalPortal = dynamic(() => import("./ModalPortal"), { ssr: false });

export { default as Button } from "./Button";
