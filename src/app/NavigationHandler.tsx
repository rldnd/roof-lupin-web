"use client";

import { useEffect } from "react";

import { usePathname } from "next/navigation";

import { setBeforeNavigationUrl } from "@/utils/navigation";

const NavigationHandler: React.FC = () => {
  const pathname = usePathname();

  useEffect(() => {
    return () => {
      setBeforeNavigationUrl(pathname);
    };
  }, [pathname]);

  return null;
};

export default NavigationHandler;
