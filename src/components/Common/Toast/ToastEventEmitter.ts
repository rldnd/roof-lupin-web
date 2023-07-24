/* eslint-disable import/no-anonymous-default-export */
import { EventEmitter } from "events";

import { TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION } from "@/common/constants/toast";
import { generateID } from "@/utils/generateId";

import { CallbackType, ChangeToastPositionType, toastAction, ToastAddType } from "./types";

class ToastEventEmitter extends EventEmitter {
  private readonly CHANGE_EVENT_NAME = "change" as const;

  addChangeListener(callback: CallbackType) {
    this.addListener(this.CHANGE_EVENT_NAME, callback);
  }

  removeChangeListener(callback: CallbackType) {
    this.removeListener(this.CHANGE_EVENT_NAME, callback);
  }

  changePosition({ bottom }: ChangeToastPositionType) {
    this.emit(this.CHANGE_EVENT_NAME, {
      action: toastAction.CHANGE_POSITION,
      bottom: bottom ?? TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION.bottom,
    });
  }

  add({ message, autoCloseTime, buttonText, onClickButton, hasClose }: ToastAddType) {
    this.emit(this.CHANGE_EVENT_NAME, {
      id: generateID("toast-message-"),
      action: toastAction.ADD,
      visible: true,
      autoCloseTime: autoCloseTime ?? 3000,
      message,
      buttonText,
      onClickButton,
      hasClose,
    });
  }

  remove(id: string) {
    this.emit(this.CHANGE_EVENT_NAME, {
      id,
      action: toastAction.REMOVE,
    });
  }

  clear() {
    this.emit(this.CHANGE_EVENT_NAME, {
      action: toastAction.CLEAR,
    });
  }
}

export default new ToastEventEmitter();
