"use client";

import { useEffect, useRef, useState } from "react";

import { useAtom, useAtomValue } from "jotai";
import { useUnmount } from "react-use";

import { INITIAL_LOCATION, INITIAL_ZOOM, LOCATION_PAGE_MAP_ID } from "@/common/constants";
import type {
  AppMapCurrentPositionPayload,
  WebMapCancelCurrentPositionPayload,
  WebMapRequestCurrentPositionPayload,
} from "@/common/types/webview/map";
import { NaverMap, useNaverMap } from "@/components/NaverMap";
import { useWebview } from "@/hooks";
import { currentPositionState, hasInitNaverMapEventEmitterState } from "@/states";
import sizes from "@/styles/constants/sizes.module.scss";

const Map: React.FC = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [position, setPosition] = useAtom(currentPositionState);
  const initialCurrentPosition = useRef(position);

  const { sendMessage, addListener, removeListener } = useWebview();
  const hasInit = useAtomValue(hasInitNaverMapEventEmitterState);
  const { load, destroy, moveCenter, setCurrentPosition } = useNaverMap(LOCATION_PAGE_MAP_ID);

  useEffect(() => {
    if (!isLoaded) return;

    sendMessage<WebMapRequestCurrentPositionPayload>({ type: "web-map/requestCurrentPosition" });
    addListener<AppMapCurrentPositionPayload>("app-map/currentPosition", ({ lat, lng }) => {
      setPosition((prev) => {
        if (!prev) moveCenter({ lat, lng });
        return { lat, lng };
      });
    });

    return () => {
      removeListener<AppMapCurrentPositionPayload>("app-map/currentPosition");
      sendMessage<WebMapCancelCurrentPositionPayload>({ type: "web-map/cancelCurrentPosition" });
    };
  }, [sendMessage, addListener, removeListener, setPosition, isLoaded, moveCenter]);

  useEffect(() => {
    if (!isLoaded || !position) return;

    setCurrentPosition({ position });
  }, [isLoaded, position, setCurrentPosition]);

  useEffect(() => {
    if (!(LOCATION_PAGE_MAP_ID in hasInit) || !hasInit[LOCATION_PAGE_MAP_ID]) return;
    const { lat, lng } = initialCurrentPosition.current ?? INITIAL_LOCATION;
    load({
      options: { center: { lat: Number(lat), lng: Number(lng) }, zoom: INITIAL_ZOOM },
      restorePosition: true,
      onLoad: () => setIsLoaded(true),
    });
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
