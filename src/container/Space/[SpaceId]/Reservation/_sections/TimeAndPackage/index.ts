import dynamic from "next/dynamic";

export const TimeAndPackage = dynamic(() => import("./TimeAndPackage"), { ssr: false });
