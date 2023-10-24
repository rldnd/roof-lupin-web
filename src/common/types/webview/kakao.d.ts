import type { GenerateWebviewPayload } from ".";

type BaseWebKakaoPayload<T extends string, U = unknown> = GenerateWebviewPayload<"web", "kakao", T, U>;

export interface WebKakaoOpenChannelTalkData {
  channelId: string;
}

/** 카카오톡 1:1 문의 */
export type WebKakaoOpenChannelTalkPayload = BaseWebKakaoPayload<"openChannelTalk", WebKakaoOpenChannelTalkData>;
