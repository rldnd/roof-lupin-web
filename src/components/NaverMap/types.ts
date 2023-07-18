import type { Location } from "@/common/types/location";

// NOTE: 이벤트에미터에서 쓰이는 타입
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
  spaceId: string;
  replaceDuplicateLocation: boolean;
}

export interface AddMarkersParameter {
  action: "addMarkers";
  markers: Array<Omit<AddMarkerParameter, "action">>;
  replaceDuplicateLocation: boolean;
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

// NOTE: naverMap 컴포넌트에서 쓰이는 타입
export interface MarkerClickedCustomEvent {
  location: {
    lat: string;
    lng: string;
  };
  spaceId: string;
}

export interface MarkerValue {
  marker: naver.maps.Marker;
  listener: naver.maps.MapEventListener;
}
