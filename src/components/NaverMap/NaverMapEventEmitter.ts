import EventEmitter from "events";

import type {
  AddMarkerParameter,
  BaseNaverMapEventParameter,
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

  loadMap(info: BaseNaverMapEventParameter<LoadParameter>) {
    this.emit(this.eventName, info);
  }

  moveCenter(position: BaseNaverMapEventParameter<MoveCenterParameter>) {
    this.emit(this.eventName, position);
  }

  addMarker(position: BaseNaverMapEventParameter<AddMarkerParameter>) {
    this.emit(this.eventName, position);
  }
}

const naverMapEventEmitter = new NaverMapEventEmitter();
export default naverMapEventEmitter;
