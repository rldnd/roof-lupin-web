import type { Location } from "@/common/types/location";

export type NaverMapEventAction = "load" | "moveCenter" | "addMarker" | "addMarkers" | "removeMarker" | "clearMarkers";

export interface LoadParameter {
  action: "load";
  options?: naver.maps.MapOptions;
}

export interface MoveCenterParameter extends Pick<Location, "lat" | "lng"> {
  action: "moveCenter";
}

export interface AddMarkerParameter extends Pick<Location, "lat" | "lng"> {
  action: "addMarker";
}

export interface AddMarkersParameter {
  action: "addMarkers";
}

export interface RemoveMarkerParameter {
  action: "removeMarker";
}

export interface ClearMarkersParameter {
  action: "clearMarkers";
}

export type ActionOmitter<T> = Omit<T, "action">;
export type BaseNaverMapEventParameter<T> = T & {
  mapId: string;
};

export type NaverMapEventParameter = BaseNaverMapEventParameter<
  | LoadParameter
  | MoveCenterParameter
  | AddMarkerParameter
  | AddMarkersParameter
  | RemoveMarkerParameter
  | ClearMarkersParameter
>;

export type NaverMapEventCallback = (event: NaverMapEventParameter) => void;
