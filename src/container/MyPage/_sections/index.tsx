import dynamic from "next/dynamic";

import { LoadingInfo } from "./Info";

export const Info = dynamic(() => import("./Info"), { ssr: false, loading: () => <LoadingInfo /> });
