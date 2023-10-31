import { HISTORY_STACK_URL } from "@/common/constants";
import { isClient } from "@/utils/next";

export const getHistoryStackUrl = () => {
  if (!isClient) return;

  return (JSON.parse(sessionStorage.getItem(HISTORY_STACK_URL) ?? "[]") ?? []) as string[];
};

export const pushHistoryStackUrl = (pathname: string, search?: string, force = false) => {
  if (!isClient) return;

  const historyStackUrl = getHistoryStackUrl();
  if (!force && historyStackUrl?.at(-1) === `${pathname}${search}`) return;
  if (Array.isArray(historyStackUrl) && historyStackUrl.length > 0) {
    sessionStorage.setItem(HISTORY_STACK_URL, JSON.stringify([...historyStackUrl, `${pathname}${search}`]));
  } else {
    sessionStorage.setItem(HISTORY_STACK_URL, JSON.stringify([`${pathname}${search}`]));
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
