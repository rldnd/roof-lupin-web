"use client";

import { memo, MutableRefObject, useCallback, useRef } from "react";

import { useSetAtom } from "jotai";

import type {
  // AddMarkerParameter,
  BaseNaverMapEventParameter,
  LoadParameter,
  MoveCenterParameter,
  NaverMapEventCallback,
} from "./types";
import { NAVER_MAP_EVENT_NAME_MAPPER } from "@/common/constants";
import { useClientEffect, useThrottleSetAtom } from "@/hooks";
import { mapCenterState, mapSizeState, mapZoomState } from "@/states/location";
import { deletePropertyInObject } from "@/utils/function";
import { loadNaverMapScript } from "@/utils/naverMap";

import naverMapEventEmitter from "./NaverMapEventEmitter";

interface Props {
  id: string;
  width: string | number;
  height: string | number;
  className?: string;
}

const Map: React.FC<Props> = ({ id, width, height, className }) => {
  const listeners = useRef<naver.maps.MapEventListener[]>([]);
  const naverMapScript = useRef<HTMLScriptElement>();
  const mapController = useRef<naver.maps.Map>();

  const setMapCenter = useThrottleSetAtom(mapCenterState);
  const setMapSize = useThrottleSetAtom(mapSizeState);
  const setMapZoom = useSetAtom(mapZoomState);

  const addCenterChangedListener = useCallback(() => {
    if (!checkMapLoaded(mapController)) return;

    const centerChangedListener = mapController.current.addListener(NAVER_MAP_EVENT_NAME_MAPPER.CENTER_CHANGED, () => {
      const center = mapController.current.getCenter();
      setMapCenter((prev) => ({ ...prev, [id]: { lat: center.y.toString(), lng: center.x.toString() } }));
    });

    listeners.current.push(centerChangedListener);
  }, [id, setMapCenter]);

  const addZoomChangedListener = useCallback(() => {
    if (!checkMapLoaded(mapController)) return;

    const zoomChangedListener = mapController.current.addListener(NAVER_MAP_EVENT_NAME_MAPPER.ZOOM_CHANGED, () => {
      const zoom = mapController.current.getZoom();
      setMapZoom((prev) => ({ ...prev, [id]: zoom }));
    });
    listeners.current.push(zoomChangedListener);
  }, [id, setMapZoom]);

  const addResizeListener = useCallback(() => {
    if (!checkMapLoaded(mapController)) return;

    const resizeListener = mapController.current.addListener(NAVER_MAP_EVENT_NAME_MAPPER.RESIZE, () => {
      const size = mapController.current.getSize();
      setMapSize((prev) => ({ ...prev, [id]: { width: size.width, height: size.height } }));
    });

    listeners.current.push(resizeListener);
  }, [id, setMapSize]);

  const load = useCallback(
    async (info: BaseNaverMapEventParameter<LoadParameter>) => {
      if (!checkIsTargetMap(info.mapId, id)) return;
      naverMapScript.current = loadNaverMapScript();
      naverMapScript.current.onload = () => {
        mapController.current = new naver.maps.Map(id, info.options);
        const center = mapController.current.getCenter();
        const zoom = mapController.current.getZoom();
        const size = mapController.current.getSize();
        setMapCenter((prev) => ({ ...prev, [id]: { lat: center.y.toString(), lng: center.x.toString() } }));
        setMapZoom((prev) => ({ ...prev, [id]: zoom }));
        setMapSize((prev) => ({ ...prev, [id]: { width: size.width, height: size.height } }));
        addCenterChangedListener();
        addZoomChangedListener();
        addResizeListener();
      };
    },
    [addCenterChangedListener, addResizeListener, addZoomChangedListener, id, setMapCenter, setMapSize, setMapZoom],
  );

  const moveCenter = useCallback(
    (position: BaseNaverMapEventParameter<MoveCenterParameter>) => {
      if (!checkMapLoaded(mapController) || !checkIsTargetMap(position.mapId, id)) return;
      mapController.current.setCenter({ lat: Number(position.lat), lng: Number(position.lng) });
    },
    [id],
  );

  // const addMarker = useCallback((position: AddMarkerParameter) => {}, []);

  const destroy = useCallback(() => {
    mapController.current?.removeListener(listeners.current);
    mapController.current?.destroy();
    naverMapScript.current?.remove();
    setMapCenter((prev) => deletePropertyInObject(prev, id));
    setMapZoom((prev) => deletePropertyInObject(prev, id));
  }, [id, setMapCenter, setMapZoom]);

  useClientEffect(() => {
    const callback: NaverMapEventCallback = (event) => {
      if (event.action === "load") load(event);
      if (event.action === "moveCenter") moveCenter(event);
      // if (event.action === "addMarker") addMarker(event);
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
