import { useCallback } from "react";

import type { PopConfirmOpenInterface } from "./types";

import PopConfirmEventEmitter from "./PopConfirmEventEmitter";

interface ReturnUsePopConfirm {
  openPopConfirm(args: Omit<PopConfirmOpenInterface, "action">): void;
  closePopConfirm(): void;
}

const usePopConfirm = (): ReturnUsePopConfirm => {
  const openPopConfirm = useCallback((args: Omit<PopConfirmOpenInterface, "action">) => {
    PopConfirmEventEmitter.open(args);
  }, []);

  const closePopConfirm = useCallback(() => {
    PopConfirmEventEmitter.close();
  }, []);

  return {
    closePopConfirm,
    openPopConfirm,
  };
};

export default usePopConfirm;
