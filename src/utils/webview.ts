import { APP_USER_AGENT } from "@/common/constants";

import { isClient } from "./next";

export const isWebview = (() => {
  if (!isClient) return false;

  return navigator.userAgent.includes(APP_USER_AGENT);
})();
