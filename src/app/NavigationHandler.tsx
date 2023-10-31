"use client";

import { useEffect } from "react";

import { usePathname } from "next/navigation";

import { isEqual } from "lodash-es";
import queryString from "query-string";

import { getHistoryStackUrl, popBeforeStackUrl, pushHistoryStackUrl } from "@/utils/navigation";

const NavigationHandler: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    const historyStackUrl = getHistoryStackUrl();

    if (Array.isArray(historyStackUrl) && historyStackUrl.length > 1) {
      const [historyPathname, historySearch] = historyStackUrl.at(-2)?.split("?") ?? ["", ""];
      if (
        historyPathname === pathname &&
        isEqual(queryString.parse(historySearch), queryString.parse(location.search))
      ) {
        popBeforeStackUrl();
      } else {
        pushHistoryStackUrl(pathname, location.search);
      }
    } else {
      pushHistoryStackUrl(pathname, location.search);
    }
  }, [pathname]);

  return null;
};

export default NavigationHandler;
