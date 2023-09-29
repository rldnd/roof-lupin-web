import EventEmitter from "events";

import type {
  AddMarkerParameter,
  AddMarkersParameter,
  AddNonInteractionMarker,
  BaseNaverMapEventParameter,
  ClearMarkersParameter,
  DeleteMarkerParameter,
  DestroyParameter,
  LoadParameter,
  MoveCenterParameter,
  NaverMapEventCallback,
} from "./types";

export class NaverMapEventEmitter extends EventEmitter {
  private readonly eventName = "naverMapEvent";

  addEventListener(callback: NaverMapEventCallback) {
    this.addListener(this.eventName, callback);
  }

  removeEventListener(callback: NaverMapEventCallback) {
    this.removeListener(this.eventName, callback);
  }

  load(info: BaseNaverMapEventParameter<LoadParameter>) {
    this.emit(this.eventName, info);
  }

  moveCenter(position: BaseNaverMapEventParameter<MoveCenterParameter>) {
    this.emit(this.eventName, position);
  }

  addNonInteractionMarker(data: BaseNaverMapEventParameter<AddNonInteractionMarker>) {
    this.emit(this.eventName, data);
  }

  addMarker(data: BaseNaverMapEventParameter<AddMarkerParameter>) {
    this.emit(this.eventName, data);
  }

  addMarkers(data: BaseNaverMapEventParameter<AddMarkersParameter>) {
    this.emit(this.eventName, data);
  }

  deleteMarker(data: BaseNaverMapEventParameter<DeleteMarkerParameter>) {
    this.emit(this.eventName, data);
  }

  clearMarkers(data: BaseNaverMapEventParameter<ClearMarkersParameter>) {
    this.emit(this.eventName, data);
  }

  destroy(info: BaseNaverMapEventParameter<DestroyParameter>) {
    this.emit(this.eventName, info);
  }
}

const naverMapEventEmitter = new NaverMapEventEmitter();
export default naverMapEventEmitter;
