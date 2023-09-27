import dynamic from "next/dynamic";

export const NaverMap = dynamic(() => import("./NaverMap"), { ssr: false });
export { default as useNaverMap } from "./useNaverMap";
