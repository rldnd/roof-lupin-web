import { APP_USER_AGENT } from "@/common/constants";

import { isClient } from "./next";

export const isWebview = (() => {
  if (!isClient) return false;

  return navigator.userAgent.includes(APP_USER_AGENT);
})();

export const isMobile = (() => {
  if (!isClient) return false;

  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
})();
