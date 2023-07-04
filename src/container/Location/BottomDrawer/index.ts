import dynamic from "next/dynamic";

export const BottomDrawer = dynamic(() => import("./BottomDrawer"), { ssr: false });
