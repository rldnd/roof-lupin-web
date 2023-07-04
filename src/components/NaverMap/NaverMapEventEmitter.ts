import EventEmitter from "events";

import type {
  AddMarkerParameter,
  BaseNaverMapEventParameter,
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

  addMarker(position: BaseNaverMapEventParameter<AddMarkerParameter>) {
    this.emit(this.eventName, position);
  }

  destroy(info: BaseNaverMapEventParameter<DestroyParameter>) {
    this.emit(this.eventName, info);
  }
}

const naverMapEventEmitter = new NaverMapEventEmitter();
export default naverMapEventEmitter;
