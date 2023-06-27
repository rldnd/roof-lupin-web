import type { GenerateWebviewPayload, WithoutData } from ".";

type BaseWebAuthPayload<T extends string, U = unknown> = GenerateWebviewPayload<"web", "auth", T, U>;
type BaseAppAuthPayload<T extends string, U = unknown> = GenerateWebviewPayload<"app", "auth", T, U>;

export interface AppAuthPushTokenData {
  pushToken: string;
}

/** 앱에서 pushToken을 보내도록 요청 */
export type WebAuthRequestPushTokenPayload = BaseWebAuthPayload<"requestPushToken", WithoutData>;
/** 앱에서 보내는 pushToken을 받음 */
export type AppAuthPushTokenPayload = BaseAppAuthPayload<"pushToken", AppAuthPushTokenData>;
/** 앱 측에서 pushToken의 값이 변경되었을 때 */
export type AppAuthPushTokenChangedPayload = BaseAppAuthPayload<"pushTokenChanged", AppAuthPushTokenData>;
