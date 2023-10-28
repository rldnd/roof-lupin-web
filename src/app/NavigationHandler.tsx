"use client";

import { useEffect } from "react";

import { usePathname } from "next/navigation";

import { getHistoryStackUrl, popBeforeStackUrl, pushHistoryStackUrl } from "@/utils/navigation";

const NavigationHandler: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    const historyStackUrl = getHistoryStackUrl();

    if (Array.isArray(historyStackUrl) && historyStackUrl.length > 1 && pathname === historyStackUrl.at(-2)) {
      popBeforeStackUrl();
    } else {
      pushHistoryStackUrl(pathname);
    }
  }, [pathname]);

  return null;
};

export default NavigationHandler;
