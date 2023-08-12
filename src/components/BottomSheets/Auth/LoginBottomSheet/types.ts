export const bottomSheetAction = {
  OPEN: "open",
  CLOSE: "close",
} as const;
type BottomSheetActionType = (typeof bottomSheetAction)[keyof typeof bottomSheetAction];

export interface BottomSheetInterface {
  action: BottomSheetActionType;
}

export type BottomSheetCallbackType = (bottomSheet: BottomSheetInterface) => void;
