export const popConfirmAction = {
  OPEN: "open",
  CLOSE: "close",
} as const;

export interface PopConfirmOpenInterface {
  action: "open";
  title: string;
  description?: string;
  onCancel?(): void;
  onConfirm(): void;
}

export interface PopConfirmCloseInterface {
  action: "close";
}

export type PopConfirmInterface = PopConfirmOpenInterface | PopConfirmCloseInterface;
export type PopConfirmCallbackType = (popConfirm: PopConfirmInterface) => void;
