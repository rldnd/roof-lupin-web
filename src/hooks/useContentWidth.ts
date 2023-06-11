import { useWindowSize } from "react-use";

import sizes from "@/styles/constants/sizes.module.scss";
import { getNumberFromPixel } from "@/utils/styles";

interface ReturnUseWindowSize {
  width: number;
  height: number;
}

const useContentWidth = (): ReturnUseWindowSize => {
  const { width: windowWidth, height: windowHeight } = useWindowSize();
  const contentMaxWidth = getNumberFromPixel(sizes.contentWidth);

  return {
    width: Math.min(windowWidth, contentMaxWidth),
    height: windowHeight,
  };
};

export default useContentWidth;
