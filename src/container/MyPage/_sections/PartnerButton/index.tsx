"use client";

import { URLS } from "@/common/constants/url";
import type { WebCommonOpenUrlPayload } from "@/common/types/webview/common";
import { usePlatform, useWebview } from "@/hooks";

import { Item } from "../Menu";

import styles from "./partnerButton.module.scss";

const PartnerButton: React.FC = () => {
  const { isWebview } = usePlatform();
  const { sendMessage } = useWebview();

  const onClick = () => {
    if (isWebview) sendMessage<WebCommonOpenUrlPayload>({ type: "web-common/openUrl", data: { url: URLS.partner } });
    else window.open(URLS.partner, "_black");
  };

  return (
    <Item onClick={onClick}>
      루프루팡 파트너스<span className={styles.chipSecondary}>호스트 전용</span>
    </Item>
  );
};

export default PartnerButton;
