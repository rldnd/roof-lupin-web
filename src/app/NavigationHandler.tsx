"use client";

import { useEffect } from "react";

import { usePathname } from "next/navigation";

import { getHistoryStackUrl, popBeforeStackUrl, pushHistoryStackUrl } from "@/utils/navigation";

const NavigationHandler: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    const historyStackUrl = getHistoryStackUrl();

    if (Array.isArray(historyStackUrl) && historyStackUrl.length > 1 && historyStackUrl.at(-2)?.includes(pathname)) {
      popBeforeStackUrl();
    } else {
      pushHistoryStackUrl(pathname, location.search);
    }
  }, [pathname]);

  return null;
};

export default NavigationHandler;
