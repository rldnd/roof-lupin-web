import type { ReactNode } from "react";

export type ToastType = "toast" | "snackbar";

export const toastAction = {
  ADD: "add",
  REMOVE: "remove",
  CHANGE_POSITION: "changePosition",
  CLEAR: "clear",
} as const;
type ToastActionType = (typeof toastAction)[keyof typeof toastAction];

export interface ToastItemInterface {
  id: string;
  action: ToastActionType;
  message: string;
  visible: boolean;
  icon: ReactNode;
  type: ToastType;
  buttonText?: string;
  onClickButton(): void | Promise<void>;
  hasClose?: boolean;
  autoCloseTime: number;
}

export interface ToastPositionInterface {
  action: ToastActionType;
  bottom: string;
}

export type ToastAddType = Pick<ToastItemInterface, "message" | "type" | "hasClose"> &
  Partial<Pick<ToastItemInterface, "autoCloseTime" | "icon" | "buttonText" | "onClickButton">>;

export type ChangeToastPositionType = Partial<Omit<ToastPositionInterface, "action">>;

export type ToastCallbackType = (toast: Pick<ToastItemInterface, "id" | "action"> | ToastItemInterface) => void;

export type PositionCallbackType = (position: ChangeToastPositionType) => void;

export type CallbackType = ToastCallbackType | PositionCallbackType;
