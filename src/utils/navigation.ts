import { NAVIGATION_BEFORE_URL } from "@/common/constants";
import { isClient } from "@/utils/next";

export const getBeforeNavigationUrl = () => {
  if (!isClient) return;

  return sessionStorage.getItem(NAVIGATION_BEFORE_URL);
};

export const setBeforeNavigationUrl = (pathname: string) => {
  if (!isClient) return;

  sessionStorage.setItem(NAVIGATION_BEFORE_URL, pathname);
};
