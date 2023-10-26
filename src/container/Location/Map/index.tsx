"use client";

import { useEffect } from "react";

import { useAtomValue } from "jotai";
import { useUnmount } from "react-use";

import { INITIAL_LOCATION, INITIAL_ZOOM, LOCATION_PAGE_MAP_ID } from "@/common/constants";
import type {
  AppMapCurrentPositionPayload,
  WebMapCancelCurrentPositionPayload,
  WebMapRequestCurrentPositionPayload,
} from "@/common/types/webview/map";
import { NaverMap, useNaverMap } from "@/components/NaverMap";
import { useToast, useWebview } from "@/hooks";
import { hasInitNaverMapEventEmitterState } from "@/states";
import sizes from "@/styles/constants/sizes.module.scss";

const Map: React.FC = () => {
  const { addToast } = useToast();
  const { sendMessage, addListener, removeListener } = useWebview();
  const hasInit = useAtomValue(hasInitNaverMapEventEmitterState);
  const { load, destroy } = useNaverMap(LOCATION_PAGE_MAP_ID);

  useEffect(() => {
    sendMessage<WebMapRequestCurrentPositionPayload>({ type: "web-map/requestCurrentPosition" });
    addListener<AppMapCurrentPositionPayload>("app-map/currentPosition", ({ lat, lng }) => {
      addToast({ message: `현재 위치 위도: ${lat} / 경도: ${lng}` });
    });

    return () => {
      removeListener<AppMapCurrentPositionPayload>("app-map/currentPosition");
      sendMessage<WebMapCancelCurrentPositionPayload>({ type: "web-map/cancelCurrentPosition" });
    };
  }, [sendMessage, addListener, addToast, removeListener]);

  useEffect(() => {
    if (!(LOCATION_PAGE_MAP_ID in hasInit) || !hasInit[LOCATION_PAGE_MAP_ID]) return;
    const { lat, lng } = INITIAL_LOCATION;
    load({ options: { center: { lat: Number(lat), lng: Number(lng) }, zoom: INITIAL_ZOOM }, restorePosition: true });
  }, [load, hasInit]);

  useUnmount(() => {
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
