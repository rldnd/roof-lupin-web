/* eslint-disable import/no-anonymous-default-export */
import EventEmitter from "events";

import { bottomSheetAction, type BottomSheetCallbackType } from "./types";

class LoginBottomSheetEventEmitter extends EventEmitter {
  private readonly EVENT_NAME = "login-bottom-sheet-event" as const;

  addChangeListener(callback: BottomSheetCallbackType) {
    this.addListener(this.EVENT_NAME, callback);
  }

  removeChangeListener(callback: BottomSheetCallbackType) {
    this.removeListener(this.EVENT_NAME, callback);
  }

  open() {
    this.emit(this.EVENT_NAME, {
      action: bottomSheetAction.OPEN,
    });
  }

  close() {
    this.emit(this.EVENT_NAME, {
      action: bottomSheetAction.CLOSE,
    });
  }
}

export default new LoginBottomSheetEventEmitter();
