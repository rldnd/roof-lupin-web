import type { Location } from "../types/location";
import type { MapScale } from "@/common/types/map";

export const LOCATION_PAGE_MAP_ID = "location-page-naver-map";

export const NAVER_MAP_EVENT_NAME_MAPPER = {
  /** 지도 레이어가 추가되면 이벤트가 발생합니다. */
  ADD_LAYER: "addLayer",
  /** 지도 좌표 경계가 변경되면 이벤트가 발생합니다. */
  BOUNDS_CHANGED: "bounds_changed",
  /** 지도 중심 좌표가 변경되면 이벤트가 발생합니다. */
  CENTER_CHANGED: "center_changed",
  /** 지도 중심 세계 좌표가 변경되면 이벤트가 발생합니다. */
  CENTER_POINT_CHANGED: "centerPoint_changed",
  /** 사용자가 지도에서 마우스 왼쪽 버튼을 클릭하면 이벤트가 발생합니다. 단, 오버레이를 클릭했을 때는 이벤트가 발생하지 않습니다. */
  CLICK: "click",
  /** 사용자가 지도에서 마우스 왼쪽 버튼을 더블 클릭하면 이벤트가 발생합니다. 단, 오버레이를 클릭했을 때는 이벤트가 발생하지 않습니다. */
  DOUBLE_CLICK: "dblclick",
  /** 사용자가 지도에서 두 번 연속으로 탭하면 이벤트가 발생합니다. */
  DOUBLE_TAP: "doubletap",
  /** 사용자가 지도를 끌어다 놓으면(드래그) 이벤트가 발생합니다. */
  DRAG: "drag",
  /** 사용자가 지도를 드래그를 종료하면 이벤트가 발생합니다. */
  DRAG_END: "dragend",
  /** 사용자가 지도를 드래그를 시작하면 이벤트가 발생합니다. */
  DRAG_START: "dragstart",
  /** 지도의 움직임이 종료되면(유휴 상태) 이벤트가 발생합니다. */
  IDLE: "idle",
  /** 지도가 초기화되면 이벤트가 발생합니다. */
  INIT: "init",
  /** 지도 위에서 키보드의 키를 누르고 있으면 이벤트가 발생합니다. */
  KEY_DOWN: "keydown",
  /** 지도 위에서 키보드의 키를 눌렀다 떼면 이벤트가 발생합니다. */
  KEYUP: "keyup",
  /** 사용자가 한 손가락으로 지도를 누르고 1초 이상 지난 후 떼면 이벤트가 발생합니다. */
  LONG_TAP: "longtap",
  /** 지도 유형이 변경되면 이벤트가 발생합니다. */
  MAP_TYPE_CHANGED: "mapType_changed",
  /** 지도 유형 id가 변경되면 이벤트가 발생합니다. */
  MAP_TYPE_ID_CHANGED: "mapTypeId_changed",
  /** 사용자가 지도에서 마우스 버튼을 누르면 이벤트가 발생합니다. */
  MOUSE_DOWN: "mousedown",
  /** 지도에서 사용자의 마우스 포인터를 움직이면 이벤트가 발생합니다. */
  MOUSE_MOVE: "mousemove",
  /** 사용자의 마우스 포인터가 지도 경계를 벗어나면 이벤트가 발생합니다. */
  MOUSE_OUT: "mouseout",
  /** 사용자의 마우스 포인터가 지도 경계에 들어오면 이벤트가 발생합니다. */
  MOUSE_OVER: "mouseover",
  /** 사용자가 지도에서 마우스 버튼을 놓으면 이벤트가 발생합니다. */
  MOUSE_UP: "mouseup",
  /** panTo, morph 메서드 등으로 지도 패닝을 시작하면 이벤트가 발생합니다. */
  PANNING: "panning",
  /** 사용자가 두 손가락으로 지도를 누르고 두 손가락을 모으거나 펼치면(핀치 제스처) 이벤트가 발생합니다. */
  PINCH: "pinch",
  /** 사용자가 지도에서 핀치 제스처를 종료하면 이벤트가 발생합니다. */
  PINCH_END: "pinchend",
  /** 사용자가 지도에서 핀치 제스처를 시작하면 이벤트가 발생합니다. */
  PINCH_START: "pinchstart",
  /** 지도 투영이 변경되면 이벤트가 발생합니다. */
  PROJECTION_CHANGED: "projection_changed",
  /** 지도 레이어가 제거되면 이벤트가 발생합니다. */
  REMOVE_LAYER: "removeLayer",
  /** 지도의 크기가 재설정되면 이벤트가 발생합니다. */
  RESIZE: "resize",
  /** 사용자가 지도에서 마우스 오른쪽 버튼을 클릭하면 이벤트가 발생합니다. */
  RIGHT_CLICK: "rightclick",
  /** 지도 크기가 변경되면 이벤트가 발생합니다. */
  SIZE_CHANGED: "size_changed",
  /** 사용자가 한 손가락으로 지도를 누르고, 즉시 한 손가락을 뗄 때 이벤트가 발생합니다. */
  TAP: "tap",
  /** 지도의 모든 타일이 로드되면 이벤트가 발생합니다. */
  TILES_LOADED: "tilesloaded",
  /** 사용자의 손가락이 지도에서 떨어지면 이벤트가 발생합니다. */
  TOUCH_END: "touchend",
  /** 사용자의 손가락이 지도에서 움직이면 이벤트가 발생합니다. */
  TOUCH_MOVE: "touchmove",
  /** 사용자의 손가락이 지도에 닿으면 이벤트가 발생합니다. */
  TOUCH_START: "touchstart",
  /** 사용자가 두 손가락으로 지도를 눌렀다가 즉시 떼면(탭) 이벤트가 발생합니다. */
  TWO_FINGER_TAP: "twofingertap",
  /** 지도 줌 레벨이 변경되면 이벤트가 발생합니다. */
  ZOOM_CHANGED: "zoom_changed",
  /** 지도 줌 효과가 종료되면 이벤트가 발생합니다. */
  ZOOM_END: "zoomend",
  /** 지도 줌 효과가 시작되면 이벤트가 발생합니다. */
  ZOOM_START: "zoomstart",
} as const;

export const MAP_SCALE_MAPPER: Record<number, MapScale> = {
  6: {
    unitPixel: 51,
    realDistancePerUnit: 100_000,
  },
  7: {
    unitPixel: 51,
    realDistancePerUnit: 50_000,
  },
  8: {
    unitPixel: 62,
    realDistancePerUnit: 30_000,
  },
  9: {
    unitPixel: 82,
    realDistancePerUnit: 20_000,
  },
  10: {
    unitPixel: 82,
    realDistancePerUnit: 10_000,
  },
  11: {
    unitPixel: 82,
    realDistancePerUnit: 5_000,
  },
  12: {
    unitPixel: 99,
    realDistancePerUnit: 3_000,
  },
  13: {
    unitPixel: 66,
    realDistancePerUnit: 1_000,
  },
  14: {
    unitPixel: 66,
    realDistancePerUnit: 500,
  },
  15: {
    unitPixel: 79,
    realDistancePerUnit: 300,
  },
  16: {
    unitPixel: 53,
    realDistancePerUnit: 100,
  },
  17: {
    unitPixel: 53,
    realDistancePerUnit: 50,
  },
  18: {
    unitPixel: 63,
    realDistancePerUnit: 30,
  },
  19: {
    unitPixel: 84,
    realDistancePerUnit: 20,
  },
  20: {
    unitPixel: 84,
    realDistancePerUnit: 10,
  },
  21: {
    unitPixel: 84,
    realDistancePerUnit: 5,
  },
};

export const INITIAL_LOCATION: Pick<Location, "lat" | "lng"> = {
  lat: "37.530207",
  lng: "127.057213",
} as const;

export const INITIAL_ZOOM = 16 as const;
