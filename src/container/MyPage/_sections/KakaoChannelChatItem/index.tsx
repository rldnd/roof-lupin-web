"use client";

import type { WebKakaoOpenChannelTalkPayload } from "@/common/types/webview/kakao";
import { usePlatform, useWebview } from "@/hooks";

import { Item } from "../Menu";

const KakaoChannelChatItem: React.FC = () => {
  const { isWebview } = usePlatform();
  const { sendMessage } = useWebview();

  const onClick = () => {
    if (isWebview)
      sendMessage<WebKakaoOpenChannelTalkPayload>({
        type: "web-kakao/openChannelTalk",
        data: { channelId: process.env.NEXT_PUBLIC_KAKAO_CHANNEL_PROFILE_ID! },
      });
    else {
      window.open(
        `https://pf.kakao.com/${process.env.NEXT_PUBLIC_KAKAO_CHANNEL_PROFILE_ID}/chat?chat_type=talk`,
        "_blank",
      );
    }
  };

  return <Item onClick={onClick}>카카오톡 1:1 문의</Item>;
};

export default KakaoChannelChatItem;
