"use client";

import { memo, MutableRefObject, useCallback, useRef } from "react";

import type {
  AddMarkerParameter,
  BaseNaverMapEventParameter,
  LoadParameter,
  MoveCenterParameter,
  NaverMapEventCallback,
} from "./types";
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
  const naverMapScript = useRef<HTMLScriptElement>();
  const mapController = useRef<naver.maps.Map>();

  const load = useCallback(
    (info: BaseNaverMapEventParameter<LoadParameter>) => {
      if (!checkIsTargetMap(info.mapId, id)) return;
      naverMapScript.current = loadNaverMapScript();
      naverMapScript.current.onload = () => {
        mapController.current = new naver.maps.Map(id, info.options);
      };
    },
    [id],
  );

  const moveCenter = useCallback(
    (position: BaseNaverMapEventParameter<MoveCenterParameter>) => {
      if (!checkMapLoaded(mapController) || !checkIsTargetMap(position.mapId, id)) return;
      mapController.current.setCenter(new naver.maps.LatLng(Number(position.lat), Number(position.lng)));
    },
    [id],
  );

  const addMarker = useCallback((position: AddMarkerParameter) => {}, []);

  const destroy = useCallback(() => {
    mapController.current?.destroy();
    naverMapScript.current?.remove();
  }, []);

  useClientEffect(() => {
    const callback: NaverMapEventCallback = (event) => {
      if (event.action === "load") load(event);
      if (event.action === "moveCenter") moveCenter(event);
      if (event.action === "addMarker") addMarker(event);
      if (event.action === "destroy") destroy();
    };

    naverMapEventEmitter.addEventListener(callback);
    return () => {
      naverMapEventEmitter.removeEventListener(callback);
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

const checkIsTargetMap = (mapId: string, id: string) => {
  return mapId === id;
};
