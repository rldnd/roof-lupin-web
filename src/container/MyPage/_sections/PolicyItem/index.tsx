"use client";

import { URLS } from "@/common/constants/url";
import type { WebCommonOpenUrlPayload } from "@/common/types/webview/common";
import { usePlatform, useWebview } from "@/hooks";

import { Item } from "../Menu";

const PolicyItem: React.FC = () => {
  const { isWebview } = usePlatform();
  const { sendMessage } = useWebview();

  const onClick = () => {
    if (isWebview) sendMessage<WebCommonOpenUrlPayload>({ type: "web-common/openUrl", data: { url: URLS.policy } });
    else window.open(URLS.policy, "_blank");
  };

  return <Item onClick={onClick}>약관 및 정책</Item>;
};

export default PolicyItem;
