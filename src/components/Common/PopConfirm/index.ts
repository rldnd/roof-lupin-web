import dynamic from "next/dynamic";

export const PopConfirm = dynamic(() => import("./PopConfirm"), { ssr: false });
