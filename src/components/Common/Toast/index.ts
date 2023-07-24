import dynamic from "next/dynamic";

import useToast from "./useToast";

const Toast = dynamic(() => import("./Toast"), { ssr: false });

export { Toast, useToast };
