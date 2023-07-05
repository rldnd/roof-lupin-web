import { atom } from "jotai";

import type { Location } from "@/common/types/location";

/** Record<mapId, Location> */
export type MapCenter = Record<string, Pick<Location, "lat" | "lng">>;
export type MapZoom = Record<string, number>;

export const initialMapZoom: MapZoom = {};
export const mapZoomState = atom<MapZoom>(initialMapZoom);

export const initialMapCenter: MapCenter = {};
export const mapCenterState = atom<MapCenter>(initialMapCenter);

export const initialLocationCategoryIds: string[] = [];
export const locationCategoryIdsState = atom<string[]>(initialLocationCategoryIds);
