import dynamic from "next/dynamic";

import { Loading } from "@/components";

const DataHandler = dynamic(() => import("./DataHandler"), { ssr: false });

export default function NaverContainer() {
  return (
    <>
      <Loading isShow />
      <DataHandler />
    </>
  );
}
