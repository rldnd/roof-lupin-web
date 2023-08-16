/* eslint-disable import/no-anonymous-default-export */
import EventEmitter from "events";

import { popConfirmAction, type PopConfirmCallbackType, type PopConfirmOpenInterface } from "./types";

class PopConfirmSheetEventEmitter extends EventEmitter {
  private readonly EVENT_NAME = "pop-confirm-event" as const;

  addChangeListener(callback: PopConfirmCallbackType) {
    this.addListener(this.EVENT_NAME, callback);
  }

  removeChangeListener(callback: PopConfirmCallbackType) {
    this.removeListener(this.EVENT_NAME, callback);
  }

  open(args: Omit<PopConfirmOpenInterface, "action">) {
    this.emit(this.EVENT_NAME, {
      action: popConfirmAction.OPEN,
      ...args,
    });
  }

  close() {
    this.emit(this.EVENT_NAME, {
      action: popConfirmAction.CLOSE,
    });
  }
}

export default new PopConfirmSheetEventEmitter();
