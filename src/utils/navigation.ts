import { HISTORY_STACK_URL } from "@/common/constants";
import { isClient } from "@/utils/next";

export const getHistoryStackUrl = () => {
  if (!isClient) return;

  return (JSON.parse(sessionStorage.getItem(HISTORY_STACK_URL) ?? "[]") ?? []) as string[];
};

export const pushHistoryStackUrl = (pathname: string) => {
  if (!isClient) return;

  const historyStackUrl = getHistoryStackUrl();
  if (historyStackUrl?.at(-1) === pathname) return;
  if (Array.isArray(historyStackUrl) && historyStackUrl.length > 0) {
    sessionStorage.setItem(HISTORY_STACK_URL, JSON.stringify([...historyStackUrl, pathname]));
  } else {
    sessionStorage.setItem(HISTORY_STACK_URL, JSON.stringify([pathname]));
  }
};

export const popBeforeStackUrl = () => {
  if (!isClient) return;

  const historyStackUrl = getHistoryStackUrl();
  if (Array.isArray(historyStackUrl) && historyStackUrl.length > 1) {
    historyStackUrl.pop();
    sessionStorage.setItem(HISTORY_STACK_URL, JSON.stringify(historyStackUrl));
  }
};
