import dynamic from "next/dynamic";

import { Loading } from "@/components";

const DataHandler = dynamic(() => import("./DataHandler"), { ssr: false });

export default function KakaoContainer() {
  return (
    <>
      <Loading isShow />
      <DataHandler />
    </>
  );
}
