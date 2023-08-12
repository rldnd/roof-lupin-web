import { useCallback } from "react";

import LoginBottomSheetEventEmitter from "./LoginBottomSheetEventEmitter";

interface ReturnUseLoginSheet {
  openSheet(): void;
  closeSheet(): void;
}

const useLoginSheet = (): ReturnUseLoginSheet => {
  const openSheet = useCallback(() => {
    LoginBottomSheetEventEmitter.open();
  }, []);

  const closeSheet = useCallback(() => {
    LoginBottomSheetEventEmitter.close();
  }, []);

  return {
    closeSheet,
    openSheet,
  };
};

export default useLoginSheet;
