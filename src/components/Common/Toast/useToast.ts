import { useCallback } from "react";

import ToastEventEmitter from "./ToastEventEmitter";
import { ChangeToastPositionType, ToastAddType } from "./types";

interface ReturnUseToast {
  addToast(toast: ToastAddType): void;
  removeToast(id: string): void;
  changePosition(position: ChangeToastPositionType): void;
  clearToasts(): void;
}

const useToast = (): ReturnUseToast => {
  const addToast = useCallback((toast: ToastAddType) => {
    ToastEventEmitter.add(toast);
  }, []);

  const removeToast = useCallback((id: string) => {
    ToastEventEmitter.remove(id);
  }, []);

  const changePosition = useCallback((position: ChangeToastPositionType) => {
    ToastEventEmitter.changePosition(position);
  }, []);

  const clearToasts = useCallback(() => {
    ToastEventEmitter.clear();
  }, []);

  return {
    addToast,
    removeToast,
    changePosition,
    clearToasts,
  };
};

export default useToast;
