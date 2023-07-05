export const loadNaverMapScript = () => {
  const scripts = Array.from(document.getElementsByTagName("script"));
  const naverScripts = scripts.filter((script) => script.src.includes("map.naver"));
  naverScripts.forEach((script) => script.remove());

  const naverMap = document.createElement("script");
  naverMap.type = "text/javascript";
  naverMap.async = true;
  naverMap.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;

  const isExists = scripts.find((script) => script.src.includes("map.naver"));
  if (!isExists) {
    const s4 = document.getElementsByTagName("script")[0];
    s4.parentNode?.insertBefore(naverMap, s4);
  }

  return naverMap;
};
