import { atom } from "jotai";

import type { Location } from "@/common/types/location";

/** Record<mapId, Location> */
export type MapCenter = Record<string, Pick<Location, "lat" | "lng">>;

export const initialMapCenter: MapCenter = {};

export const mapCenterState = atom<MapCenter>(initialMapCenter);
