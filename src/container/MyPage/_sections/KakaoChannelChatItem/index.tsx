"use client";

import { WebCommonOpenUrlPayload } from "@/common/types/webview/common";
import { usePlatform, useWebview } from "@/hooks";

import { Item } from "../Menu";

const KakaoChannelChatItem: React.FC = () => {
  const { isWebview } = usePlatform();
  const { sendMessage } = useWebview();

  const onClick = () => {
    const url = `https://pf.kakao.com/${process.env.NEXT_PUBLIC_KAKAO_CHANNEL_PROFILE_ID}/chat?chat_type=talk`;

    if (isWebview)
      sendMessage<WebCommonOpenUrlPayload>({
        type: "web-common/openUrl",
        data: { url },
      });
    else {
      window.open(url, "_blank");
    }
  };

  return <Item onClick={onClick}>카카오톡 1:1 문의</Item>;
};

export default KakaoChannelChatItem;
