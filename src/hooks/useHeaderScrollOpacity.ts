import { useWindowScroll } from "react-use";

interface UseHeaderScrollOpacityArgs {
  containerHeight: number;
  headerHeight: number;
}

interface ReturnUseHeaderScrollOpacity {
  breakpoint: boolean;
  backgroundBreakpoint: boolean;
  opacity: number;
  backgroundOpacity: number;
}

const useHeaderScrollOpacity = ({
  containerHeight,
  headerHeight,
}: UseHeaderScrollOpacityArgs): ReturnUseHeaderScrollOpacity => {
  const { y } = useWindowScroll();

  const getBreakpoint = (earlyLevel: number) => {
    return y > containerHeight - earlyLevel * headerHeight;
  };

  const getOpacity = (earlyLevel: number) => {
    if (containerHeight - y < earlyLevel * headerHeight && containerHeight - y > 0) {
      return Math.abs(containerHeight - y - earlyLevel * headerHeight) / (earlyLevel * headerHeight);
    } else return 1;
  };

  return {
    breakpoint: getBreakpoint(2),
    backgroundBreakpoint: getBreakpoint(1),
    opacity: getOpacity(2),
    backgroundOpacity: getOpacity(1),
  };
};

export default useHeaderScrollOpacity;
