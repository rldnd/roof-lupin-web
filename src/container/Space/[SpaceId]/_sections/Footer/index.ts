import dynamic from "next/dynamic";

export const Footer = dynamic(() => import("./Footer"), { ssr: false });
