"use client";

import { memo, MutableRefObject, useCallback, useRef } from "react";

import type {
  AddMarkerParameter,
  BaseNaverMapEventParameter,
  LoadParameter,
  MoveCenterParameter,
  NaverMapEventCallback,
} from "./types";
import { MAP_LOADED_EVENT_NAME } from "@/common/constants";
import { useClientEffect } from "@/hooks";
import { loadNaverMapScript } from "@/utils/naverMap";

import naverMapEventEmitter from "./NaverMapEventEmitter";

interface Props {
  id: string;
  width: string | number;
  height: string | number;
  className?: string;
}

const Map: React.FC<Props> = ({ id, width, height, className }) => {
  const mapInfo = useRef<BaseNaverMapEventParameter<LoadParameter>>();
  const naverMapScript = useRef<HTMLScriptElement>();

  const mapController = useRef<naver.maps.Map>();

  const load = useCallback((info: BaseNaverMapEventParameter<LoadParameter>) => {
    mapInfo.current = info;
    naverMapScript.current = loadNaverMapScript();
    naverMapScript.current.onload = () => {
      window.dispatchEvent(new CustomEvent(MAP_LOADED_EVENT_NAME));
    };
  }, []);

  const moveCenter = useCallback((position: BaseNaverMapEventParameter<MoveCenterParameter>) => {
    if (!checkMapLoaded(mapController)) return;

    mapController.current.setCenter(new naver.maps.LatLng(Number(position.lat), Number(position.lng)));
  }, []);

  const addMarker = useCallback((position: AddMarkerParameter) => {}, []);

  useClientEffect(() => {
    const initMap = () => {
      if (mapInfo.current?.mapId !== id) return;
      mapController.current = new naver.maps.Map(id, mapInfo.current?.options);
    };

    const callback: NaverMapEventCallback = (event) => {
      if (event.action === "load") load(event);
      if (event.action === "moveCenter") moveCenter(event);
      if (event.action === "addMarker") addMarker(event);
    };

    window.addEventListener(MAP_LOADED_EVENT_NAME, initMap);
    document.addEventListener(MAP_LOADED_EVENT_NAME, initMap);
    naverMapEventEmitter.addEventListener(callback);
    return () => {
      window.removeEventListener(MAP_LOADED_EVENT_NAME, initMap);
      document.removeEventListener(MAP_LOADED_EVENT_NAME, initMap);
      naverMapEventEmitter.removeEventListener(callback);
      naverMapScript.current?.remove();
    };
  }, [id]);

  return <div id={id} style={{ width, height }} className={className} />;
};

export default memo(Map);

const checkMapLoaded = (
  mapController: MutableRefObject<naver.maps.Map | undefined>,
): mapController is MutableRefObject<naver.maps.Map> => {
  return mapController.current !== undefined;
};
