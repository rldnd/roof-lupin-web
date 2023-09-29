import type { Location } from "@/common/types/location";

// NOTE: 이벤트에미터에서 쓰이는 타입
export type NaverMapEventAction =
  | "load"
  | "moveCenter"
  | "addMarker"
  | "addMarkers"
  | "deleteMarker"
  | "clearMarkers"
  | "destroy";

export interface LoadParameter {
  action: "load";
  restorePosition: boolean;
  options?: naver.maps.MapOptions;
  onLoad?(): void;
}

export interface DestroyParameter {
  action: "destroy";
}

export interface MoveCenterParameter extends Pick<Location, "lat" | "lng"> {
  action: "moveCenter";
}

export interface AddNonInteractionMarker extends Pick<Location, "lat" | "lng"> {
  action: "addNonInteractionMarker";
  icon: string;
}

export interface AddMarkerParameter extends Pick<Location, "lat" | "lng"> {
  action: "addMarker";
  spaceId: string[];
  title?: string;
  icon: string;
  orderNo: number | null;
  replaceDuplicateLocation: boolean;
}

export interface AddMarkersParameter {
  action: "addMarkers";
  markers: Array<Omit<AddMarkerParameter, "action">>;
  clearBeforeMarkers?: boolean;
}

export interface DeleteMarkerParameter {
  action: "deleteMarker";
  location: Pick<Location, "lat" | "lng">;
}

export interface ClearMarkersParameter {
  action: "clearMarkers";
}

export type ActionOmitter<T> = Omit<T, "action">;
export type BaseNaverMapEventParameter<T = object> = T & {
  mapId: string;
};

export type NaverMapEventParameter = BaseNaverMapEventParameter<
  | LoadParameter
  | DestroyParameter
  | MoveCenterParameter
  | AddMarkerParameter
  | AddMarkersParameter
  | AddNonInteractionMarker
  | DeleteMarkerParameter
  | ClearMarkersParameter
>;

export type NaverMapEventCallback = (event: NaverMapEventParameter) => void;

// NOTE: naverMap 컴포넌트에서 쓰이는 타입
export interface MarkerClickedCustomEvent {
  location: {
    lat: string;
    lng: string;
  };
  title?: string;
  icon: string;
  spaceId: string[];
}

export interface MarkerValue {
  marker: naver.maps.Marker;
  listener: naver.maps.MapEventListener;
}
