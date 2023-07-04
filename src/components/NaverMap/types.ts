import type { Location } from "@/common/types/location";

export type NaverMapEventAction =
  | "load"
  | "moveCenter"
  | "addMarker"
  | "addMarkers"
  | "removeMarker"
  | "clearMarkers"
  | "destroy";

export interface LoadParameter {
  action: "load";
  options?: naver.maps.MapOptions;
}

export interface DestroyParameter {
  action: "destroy";
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
  | DestroyParameter
  | MoveCenterParameter
  | AddMarkerParameter
  | AddMarkersParameter
  | RemoveMarkerParameter
  | ClearMarkersParameter
>;

export type NaverMapEventCallback = (event: NaverMapEventParameter) => void;
