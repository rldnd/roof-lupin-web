import { atom } from "jotai";

import { CURRENT_POSITION } from "@/common/constants";
import type { Location } from "@/common/types/location";
import { sessionPersistenceAtom } from "@/utils/jotai";

interface ClickedMapMarkerValue {
  spaceId: string[];
  icon: string;
  title?: string;
  location: Pick<Location, "lat" | "lng">;
}

/** Record<mapId, Location> */
export type MapCenter = Record<string, Pick<Location, "lat" | "lng">>;
export type MapZoom = Record<string, number>;
export type MapSize = Record<string, { width: number; height: number }>;
export type ClickedMapMarker = Record<string, ClickedMapMarkerValue | null>;
export type HasInitNaverMapEventEmitter = Record<string, boolean>;
export type CurrentPosition = Pick<Location, "lat" | "lng"> | null;

export const initialMapZoom: MapZoom = {};
export const mapZoomState = atom<MapZoom>(initialMapZoom);

export const initialMapCenter: MapCenter = {};
export const mapCenterState = atom<MapCenter>(initialMapCenter);

export const initialLocationCategoryIds: string[] = [];
export const locationCategoryIdsState = atom<string[]>(initialLocationCategoryIds);

export const initialMapSize: MapSize = {};
export const mapSizeState = atom<MapSize>(initialMapSize);

export const initialClickedMapMarker: ClickedMapMarker = {};
export const clickedMapMarkerState = atom<ClickedMapMarker>(initialClickedMapMarker);

export const initialHasInitNaverMapEventEmitter: HasInitNaverMapEventEmitter = {};
export const hasInitNaverMapEventEmitterState = atom<HasInitNaverMapEventEmitter>(initialHasInitNaverMapEventEmitter);

export const initialCurrentPosition: CurrentPosition = null;
export const currentPositionState = sessionPersistenceAtom<CurrentPosition | null>(
  CURRENT_POSITION,
  initialCurrentPosition,
);
