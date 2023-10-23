import { type Dispatch, MouseEventHandler, type SetStateAction, useCallback, useEffect, useRef } from "react";

import useDebounceCallback from "./useDebounceCallback";

type Id = string | number;

interface UseDataToggleArgs {
  id: Id;
  isActive: boolean;
  isActiveData: boolean | undefined;
  setIsActive: Dispatch<SetStateAction<boolean>>;
  onCreate(id: Id): unknown | Promise<unknown>;
  onDelete(id: Id): unknown | Promise<unknown>;
  debounceDelay?: number;
}

type ReturnUseDataToggle = MouseEventHandler<HTMLElement>;

const useDataToggle = ({
  id,
  isActive,
  isActiveData,
  setIsActive,
  onCreate,
  onDelete,
  debounceDelay = 300,
}: UseDataToggleArgs): ReturnUseDataToggle => {
  const beforeClickStatus = useRef(isActive);

  const handleActive = useDebounceCallback((isDataChanged: boolean, isActive: boolean, id: Id) => {
    if (!isDataChanged) return;

    if (isActive) onCreate(id);
    if (!isActive) onDelete(id);
  }, debounceDelay);

  const handleClick: MouseEventHandler<HTMLElement> = useCallback(() => {
    setIsActive((prev) => {
      const isDataChanged = beforeClickStatus.current !== !prev;
      handleActive(isDataChanged, !prev, id);

      return !prev;
    });
  }, [handleActive, id, setIsActive]);

  useEffect(() => {
    if (!isActiveData) return;
    beforeClickStatus.current = isActiveData;
  }, [isActiveData]);

  return handleClick;
};

export default useDataToggle;
