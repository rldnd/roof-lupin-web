export const loadNaverMapScript = (): HTMLScriptElement => {
  const naverMap = document.createElement("script");
  naverMap.type = "text/javascript";
  naverMap.async = true;
  naverMap.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;

  const s4 = document.getElementsByTagName("script")[0];
  s4.parentNode?.insertBefore(naverMap, s4);

  return naverMap;
};
