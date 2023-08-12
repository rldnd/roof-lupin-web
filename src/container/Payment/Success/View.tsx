"use client";

import dynamic from "next/dynamic";

import { useAtomValue } from "jotai";

import type { SpaceDetail } from "@/common/types/space";
import { useSuspenseQuery } from "@/hooks";
import { getClientSpaceApi } from "@/services/space";
import { reservationState } from "@/states";

const TopSection = dynamic(() => import("./TopSection"), { ssr: false });
const BottomSection = dynamic(() => import("./BottomSection"), { ssr: false });

const View: React.FC = () => {
  const { spaceId } = useAtomValue(reservationState);
  const { data: space } = useSuspenseQuery<SpaceDetail>(
    ["getClientSpace", spaceId],
    () => getClientSpaceApi(spaceId!),
    {
      enabled: Boolean(spaceId),
      suspense: false,
    },
  );

  return (
    <>
      <TopSection space={space} />
      <hr />
      <BottomSection space={space} />
    </>
  );
};

export default View;
