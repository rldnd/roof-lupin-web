import type { GenerateWebviewPayload, WithoutData } from ".";

type BaseWebScreenPayload<T extends string, U = unknown> = GenerateWebviewPayload<"web", "screen", T, U>;

export interface WebScreenSafeAreaData {
  hasTopSafeArea: boolean;
  hasBottomSafeArea: boolean;
}

/** 웹에서 앱의 safeArea를 컨트롤 */
export type WebScreenSafeAreaPayload = BaseWebScreenPayload<"safeArea", WebScreenSafeAreaData>;
