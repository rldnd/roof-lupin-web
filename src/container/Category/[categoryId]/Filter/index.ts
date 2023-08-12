import dynamic from "next/dynamic";

export const Filter = dynamic(() => import("./Filter"), { ssr: false });
