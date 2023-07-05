const removeNaverMapScripts = async (): Promise<void> => {
  return new Promise((res) => {
    const scripts = Array.from(document.getElementsByTagName("script"));
    const naverScripts = scripts.filter((script) => script.src.includes("map.naver"));
    naverScripts.forEach((script) => script.remove());
    res();
  });
};

export const loadNaverMapScript = async (): Promise<HTMLScriptElement> => {
  await removeNaverMapScripts();

  const naverMap = document.createElement("script");
  naverMap.type = "text/javascript";
  naverMap.async = true;
  naverMap.src = `https://openapi.map.naver.com/openapi/v3/maps.js?ncpClientId=${process.env.NEXT_PUBLIC_NAVER_CLIENT_ID}`;

  const scripts = Array.from(document.getElementsByTagName("script"));
  const isExists = scripts.find((script) => script.src.includes("map.naver"));
  if (!isExists) {
    const s4 = document.getElementsByTagName("script")[0];
    s4.parentNode?.insertBefore(naverMap, s4);
  }

  return naverMap;
};
