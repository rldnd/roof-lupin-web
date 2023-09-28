import { isClient } from "./next";

if (isClient) {
  const ga4 = document.createElement("script");
  ga4.type = "text/javascript";
  ga4.async = true;
  ga4.src = `https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS_ID}`;

  const $head = document.getElementsByTagName("head")[0];
  $head.appendChild(ga4);

  window.dataLayer = window.dataLayer || [];

  window.gtag = function gtag() {
    /* eslint-disable prefer-rest-params */
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", process.env.NEXT_PUBLIC_GA_ID as string);
}
