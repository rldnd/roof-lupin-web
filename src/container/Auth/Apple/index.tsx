import { Suspense } from "react";

import { Loading } from "@/components";

import DataHandler from "./DataHandler";

export default function AppleContainer() {
  return (
    <>
      <Loading isShow />
      <Suspense fallback={null}>
        <DataHandler />
      </Suspense>
    </>
  );
}