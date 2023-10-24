import dynamic from "next/dynamic";

export const Header = dynamic(() => import("./Header"), { ssr: false });
