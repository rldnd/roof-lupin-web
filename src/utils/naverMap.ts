import type { MutableRefObject } from "react";

import { MAP_SCALE_MAPPER, RESTORE_MAP_CENTER, RESTORE_MAP_ZOOM } from "@/common/constants";
import { Location } from "@/common/types/location";
import { SpaceCategory } from "@/common/types/space";
import type { MarkerValue } from "@/components/NaverMap/types";
import { MapCenter, MapZoom } from "@/states";

import { isClient } from "./next";

type LocationObject = {
  lat: string | number;
  lng: string | number;
};

export const loadNaverMapScript = () => {
  const scripts = Array.from(document.getElementsByTagName("script"));
  const naverScripts = scripts.filter((script) => script.src.includes("map.naver"));
  naverScripts.forEach((script) => script.remove());

  const naverMap = document.createElement("script");
  naverMap.type = "text/javascript";
  naverMap.async = true;
  naverMap.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;

  const $head = document.getElementsByTagName("head")[0];
  $head.appendChild(naverMap);

  return naverMap;
};

export const getDistance = ({ zoom, width, height }: { zoom?: number; width?: number; height?: number }): number => {
  if (!zoom || !width || !height) return 0;

  const scale = MAP_SCALE_MAPPER[zoom];
  return ((Math.min(width, height) / scale.unitPixel) * scale.realDistancePerUnit) / 2;
};

export const checkMapLoaded = (
  mapController: MutableRefObject<naver.maps.Map | undefined>,
): mapController is MutableRefObject<naver.maps.Map> => {
  return mapController.current !== undefined;
};

export const checkIsTargetMap = (mapId: string, id: string) => {
  return mapId === id;
};

/** { lat, lng } 형태를 '${lat},${lng}' 형태로 반환합니다. */
export const getMarkerLocationObjectToString = (location: LocationObject) => {
  return `${location.lat},${location.lng}`;
};

/** '${lat},${lng}' 형태를 { lat, lng } 형태로 반환합니다. */
export const getMarkerLocationStringToObject = (location: string, isString: boolean) => {
  const [lat, lng] = location.split(",");
  if (isString) return { lat, lng } satisfies LocationObject;
  else return { lat: Number(lat), lng: Number(lng) } satisfies LocationObject;
};

export const checkMarkerLocationDuplicates = (
  markers: Record<string, MarkerValue>,
  location: LocationObject,
): boolean => {
  const locationString = getMarkerLocationObjectToString(location);
  return Object.keys(markers).some((markerKey) => markerKey === locationString);
};

export const getMapNonInteractiveMarkerContent = (icon: string) => {
  return `<div style="position: relative; width:45px; height:56px; display: flex; align-items: center; justify-content: center;">
            <img src="/icons/map/map-non-interactive-marker.svg" alt="마커" />
            <img src=${icon} width="32px" height="32px" alt="마커 이미지" object-fit: contain; style="position: absolute; top: 5px; left: 50%; transform: translateX(-50%);"/>
          </div>`;
};

export const getMapMarkerContent = (icon: string, count: number) => {
  const badge =
    count > 1
      ? `<div style="position: absolute; right: -4px; top: -4px; border: 1px solid #ffffff; background-color: #eb4824; box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.3); border-radius: 50%; width: 16px; height: 16px; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 10px; font-weight: 600; line-height: 130%">${count}</div>`
      : "";

  return `<div style="position: relative; width:38px; height:38px; display: flex; align-items: center; justify-content: center;">
            <img src="/icons/map/map-marker.svg" alt="마커" />
            <img src=${icon} width="20px" height="20px" alt="마커 이미지" object-fit: contain; style="position: absolute; top: 5px; left: 50%; transform: translateX(-50%);"/>
            ${badge}
          </div>`;
};

export const getClickedMapMarkerContent = (icon: string, count: number, title?: string) => {
  const titleText = title
    ? `<span style="color: #212121; font-size: 12px; font-style: normal; font-weight: 600; line-height: 130%; text-align: center;">${title}<span/>`
    : "";
  const badge =
    count > 1
      ? `<div style="position: absolute; left: calc(50% + 20px); top: -4px; transform: translateX(-50%); border: 1.25px solid #ffffff; background-color: #eb4824; box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.3); border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; color: #ffffff; font-size: 12px; font-weight: 600; line-height: 130%">${count}</div>`
      : "";

  return `<div style="position: relative; display: flex; align-items: center; justify-content: center; width:100px; flex-direction: column; margin-top: 32px;">
            <img src="/icons/map/map-clicked-marker.svg" width="62px" height="72.333px" alt="마커" />
            <img src=${icon} width="20px" height="20px" alt="마커 이미지" style="position: absolute; top: 16px; left: 50%; transform: translateX(-50%) scale(1.6);"/>
            ${titleText}
            ${badge}
          </div>`;
};

export const getCurrentPositionMarkerContent = () => {
  return `<div style="position: relative; width:38px; height:38px; display: flex; align-items: center; justify-content: center;">
            <img src="/icons/map/map-current-position.svg" alt="현재 위치" />
          </div>`;
};

export const getMapMarkerIconWithOrderNoSorting = (categories: SpaceCategory[]) => {
  if (categories.length === 0) return null;
  return [...categories].sort((a, b) => a.orderNo ?? 100 - (b.orderNo ?? 100))[0];
};

export const getRestoreMapZoom = (id: string): number | null => {
  if (!isClient || !sessionStorage.getItem(RESTORE_MAP_ZOOM)) return null;

  const restoreMapZoom = JSON.parse(sessionStorage.getItem(RESTORE_MAP_ZOOM) || "{}") as MapZoom;
  if (restoreMapZoom && id in restoreMapZoom && restoreMapZoom[id]) {
    return restoreMapZoom[id] as number;
  }
  return null;
};

export const setRestoreMapZoom = (id: string, zoom: number) => {
  if (!isClient) return;

  if (!sessionStorage.getItem(RESTORE_MAP_ZOOM)) {
    sessionStorage.setItem(RESTORE_MAP_ZOOM, JSON.stringify({ [id]: zoom }));
  } else {
    const restoreMapZoom = JSON.parse(sessionStorage.getItem(RESTORE_MAP_ZOOM) || "{}") as MapZoom;
    sessionStorage.setItem(RESTORE_MAP_ZOOM, JSON.stringify({ ...restoreMapZoom, [id]: zoom }));
  }
};

export const getRestoreMapCenter = (id: string): Pick<Location, "lat" | "lng"> | null => {
  if (!isClient || !sessionStorage.getItem(RESTORE_MAP_CENTER)) return null;
  const restoreMapCenter = JSON.parse(sessionStorage.getItem(RESTORE_MAP_CENTER) || "{}") as MapCenter;

  if (restoreMapCenter && id in restoreMapCenter && restoreMapCenter[id]) {
    return restoreMapCenter[id] as Pick<Location, "lat" | "lng">;
  }
  return null;
};

export const setRestoreMapCenter = (id: string, position: Pick<Location, "lat" | "lng">) => {
  if (!isClient) return;

  if (!sessionStorage.getItem(RESTORE_MAP_CENTER)) {
    sessionStorage.setItem(RESTORE_MAP_CENTER, JSON.stringify({ [id]: position }));
  } else {
    const restoreMapCenter = JSON.parse(sessionStorage.getItem(RESTORE_MAP_CENTER) || "{}") as MapCenter;
    sessionStorage.setItem(RESTORE_MAP_CENTER, JSON.stringify({ ...restoreMapCenter, [id]: position }));
  }
};
