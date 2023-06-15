import type { GenerateWebviewPayload, WithoutData } from ".";

type BaseWebScreenPayload<T extends string, U = unknown> = GenerateWebviewPayload<"web", "screen", T, U>;

type StatusBarTheme = "light" | "dark";

export interface WebScreenSafeAreaData {
  hasTopSafeArea: boolean;
  hasBottomSafeArea: boolean;
}

export interface WebScreenStatusBarThemeData {
  theme: StatusBarTheme;
}

/** 웹에서 앱의 safeArea를 컨트롤 */
export type WebScreenSafeAreaPayload = BaseWebScreenPayload<"safeArea", WebScreenSafeAreaData>;
/** 앱의 statusBar theme를 컨트롤 */
export type WebScreenStatusBarThemePayload = BaseWebScreenPayload<"statusBarTheme", WebScreenStatusBarThemeData>;
