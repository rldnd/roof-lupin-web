"use client";

import { useEffect } from "react";

import { useAtomValue } from "jotai";
import { useUnmount } from "react-use";

import { INITIAL_LOCATION, INITIAL_ZOOM, LOCATION_PAGE_MAP_ID } from "@/common/constants";
import type {
  WebMapCancelCurrentPositionPayload,
  WebMapRequestCurrentPositionPayload,
} from "@/common/types/webview/map";
import { NaverMap, useNaverMap } from "@/components/NaverMap";
import { useWebview } from "@/hooks";
import { hasInitNaverMapEventEmitterState } from "@/states";
import sizes from "@/styles/constants/sizes.module.scss";

const Map: React.FC = () => {
  const { sendMessage } = useWebview();
  const hasInit = useAtomValue(hasInitNaverMapEventEmitterState);
  const { load, destroy } = useNaverMap(LOCATION_PAGE_MAP_ID);

  useEffect(() => {
    sendMessage<WebMapRequestCurrentPositionPayload>({ type: "web-map/requestCurrentPosition" });

    return () => {
      sendMessage<WebMapCancelCurrentPositionPayload>({ type: "web-map/cancelCurrentPosition" });
    };
  }, [sendMessage]);

  useEffect(() => {
    if (!(LOCATION_PAGE_MAP_ID in hasInit) || !hasInit[LOCATION_PAGE_MAP_ID]) return;
    const { lat, lng } = INITIAL_LOCATION;
    load({ options: { center: { lat: Number(lat), lng: Number(lng) }, zoom: INITIAL_ZOOM }, restorePosition: true });
  }, [load, hasInit]);

  useUnmount(() => {
    sendMessage<WebMapCancelCurrentPositionPayload>({ type: "web-map/cancelCurrentPosition" });
    destroy();
  });

  return (
    <NaverMap
      id={LOCATION_PAGE_MAP_ID}
      width="100%"
      height={`calc(100vh - ${sizes.baseHeaderHeight} - ${sizes.locationCategoryHeight} - ${sizes.bottomNavigationHeight})`}
    />
  );
};

export default Map;
