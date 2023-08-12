import dynamic from "next/dynamic";

import { LoadingContent } from "./Content";

export const Content = dynamic(() => import("./Content"), { ssr: false, loading: () => <LoadingContent /> });
