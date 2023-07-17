import dynamic from "next/dynamic";

import { LoadingService } from "./Service";

export const Service = dynamic(() => import("./Service"), { ssr: false, loading: () => <LoadingService /> });
