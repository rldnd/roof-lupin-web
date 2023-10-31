"use client";

import { useEffect } from "react";

import Script from "next/script";

const GAScript: React.FC = () => {
  useEffect(() => {
    window.dataLayer = window.dataLayer || [];

    window.gtag = function gtag() {
      /* eslint-disable prefer-rest-params */
      window.dataLayer.push(arguments);
    };

    window.gtag("js", new Date());
    window.gtag("config", process.env.NEXT_PUBLIC_GA_ID as string);
  }, []);

  return (
    <Script async src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`} />
  );
};

export default GAScript;
