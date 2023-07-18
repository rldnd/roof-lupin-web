import type { MutableRefObject } from "react";

import { MAP_SCALE_MAPPER } from "@/common/constants";
import type { MarkerValue } from "@/components/NaverMap/types";

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

  const isExists = scripts.find((script) => script.src.includes("map.naver"));
  if (!isExists) {
    const s4 = document.getElementsByTagName("script")[0];
    s4.parentNode?.insertBefore(naverMap, s4);
  }

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
