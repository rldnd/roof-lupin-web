import type { GenerateWebviewPayload } from ".";

type BaseAppCommonPayload<T extends string, U = unknown> = GenerateWebviewPayload<"app", "common", T, U>;

export interface AppCommonPlatformData {
  platform: "ios" | "android";
}

/** 웹뷰 플랫폼 체크 */
export type AppCommonPlatformPayload = BaseAppCommonPayload<"platform", AppCommonPlatformData>;
