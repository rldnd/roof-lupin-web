"use client";

import { useEffect, useState } from "react";

import { AppCommonAppVersionPayload, WebCommonAppVersionPayload } from "@/common/types/webview/common";
import { usePlatform, useWebview } from "@/hooks";

import { Item } from "../Menu";

const AppVersionItem: React.FC = () => {
  const [version, setVersion] = useState("");
  const { isWebview } = usePlatform();
  const { addListener, sendMessage, removeListener } = useWebview();

  useEffect(() => {
    addListener<AppCommonAppVersionPayload>("app-common/appVersion", ({ version }) => setVersion(version));
    sendMessage<WebCommonAppVersionPayload>({ type: "web-common/appVersion" });

    return () => {
      removeListener<AppCommonAppVersionPayload>("app-common/appVersion");
    };
  }, [addListener, removeListener, sendMessage]);

  if (!isWebview) return null;

  return <Item right={<span>현재 버전 {version}</span>}>앱 버전 정보</Item>;
};

export default AppVersionItem;
