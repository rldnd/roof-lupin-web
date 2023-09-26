"use client";

import { useSearchParams } from "next/navigation";

import { INITIAL_LOCATION, INITIAL_ZOOM } from "@/common/constants";

interface ReturnUseMapInfo {
  lat: string;
  lng: string;
  zoom: number;
}

const useMapInfo = (): ReturnUseMapInfo => {
  const searchParams = useSearchParams();

  const lat = searchParams.get("lat") ?? INITIAL_LOCATION.lat;
  const lng = searchParams.get("lng") ?? INITIAL_LOCATION.lng;
  const zoom = searchParams.get("zoom") ?? INITIAL_ZOOM;

  return {
    lat,
    lng,
    zoom: Number(zoom),
  };
};

export default useMapInfo;
