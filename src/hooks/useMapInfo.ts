"use client";

import { useAtomValue } from "jotai";

import { INITIAL_LOCATION, INITIAL_ZOOM } from "@/common/constants";
import { mapCenterState, mapZoomState } from "@/states";

interface ReturnUseMapInfo {
  lat: string;
  lng: string;
  zoom: number;
}

const useMapInfo = (mapId: string): ReturnUseMapInfo => {
  const mapCenter = useAtomValue(mapCenterState);
  const mapZoom = useAtomValue(mapZoomState);

  const lat = mapCenter?.[mapId]?.lat ?? INITIAL_LOCATION.lat;
  const lng = mapCenter?.[mapId]?.lng ?? INITIAL_LOCATION.lng;
  const zoom = mapZoom?.[mapId] ?? INITIAL_ZOOM;

  return {
    lat,
    lng,
    zoom: Number(zoom),
  };
};

export default useMapInfo;
