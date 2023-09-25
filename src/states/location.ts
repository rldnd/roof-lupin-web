import { atom } from "jotai";

import { MAP_CENTER, MAP_ZOOM } from "@/common/constants";
import type { Location } from "@/common/types/location";
import { sessionPersistenceAtom } from "@/utils/jotai";

interface ClickedMapMarkerValue {
  spaceId: string;
  location: Pick<Location, "lat" | "lng">;
}

/** Record<mapId, Location> */
export type MapCenter = Record<string, Pick<Location, "lat" | "lng">>;
export type MapZoom = Record<string, number>;
export type MapSize = Record<string, { width: number; height: number }>;
export type ClickedMapMarker = Record<string, ClickedMapMarkerValue | null>;

export const initialMapZoom: MapZoom = {};
export const mapZoomState = sessionPersistenceAtom<MapZoom>(MAP_ZOOM, initialMapZoom);

export const initialMapCenter: MapCenter = {};
export const mapCenterState = sessionPersistenceAtom<MapCenter>(MAP_CENTER, initialMapCenter);

export const initialLocationCategoryIds: string[] = [];
export const locationCategoryIdsState = atom<string[]>(initialLocationCategoryIds);

export const initialMapSize: MapSize = {};
export const mapSizeState = atom<MapSize>(initialMapSize);

export const initialClickedMapMarker: ClickedMapMarker = {};
export const clickedMapMarkerState = atom<ClickedMapMarker>(initialClickedMapMarker);
