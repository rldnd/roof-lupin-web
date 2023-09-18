import type { GenerateWebviewPayload, WithoutData } from ".";

type BaseWebCommonPayload<T extends string, U = unknown> = GenerateWebviewPayload<"web", "common", T, U>;
type BaseAppCommonPayload<T extends string, U = unknown> = GenerateWebviewPayload<"app", "common", T, U>;

export interface AppCommonPlatformData {
  platform: "ios" | "android";
}

export interface WebCommonCallData {
  phoneNumber: string;
}

/** 플랫폼 확인 요청 */
export type WebCommonPlatformPayload = BaseWebCommonPayload<"platform", WithoutData>;
/** 웹뷰 플랫폼 체크 */
export type AppCommonPlatformPayload = BaseAppCommonPayload<"platform", AppCommonPlatformData>;
/** 전화 하기 */
export type WebCommonCallPayload = BaseWebCommonPayload<"call", WebCommonCallData>;
