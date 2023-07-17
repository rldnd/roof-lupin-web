import dynamic from "next/dynamic";

export const Service = dynamic(() => import("./Service"), { ssr: false });
