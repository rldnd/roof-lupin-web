import type { GenerateWebviewPayload } from ".";

type BaseWebScreenPayload<T extends string, U = unknown> = GenerateWebviewPayload<"web", "screen", T, U>;

type StatusBarTheme = "light" | "dark";

export interface WebScreenSafeAreaData {
  hasTopSafeArea: boolean;
  hasBottomSafeArea: boolean;
}

export interface WebScreenStatusBarThemeData {
  theme: StatusBarTheme;
}

export interface WebScreenShareData {
  path: string;
  title: string;
  description: string;
  imageUrl: string;
}

/** 웹에서 앱의 safeArea를 컨트롤 */
export type WebScreenSafeAreaPayload = BaseWebScreenPayload<"safeArea", WebScreenSafeAreaData>;
/** 앱의 statusBar theme를 컨트롤 */
export type WebScreenStatusBarThemePayload = BaseWebScreenPayload<"statusBarTheme", WebScreenStatusBarThemeData>;
/** 웹에서 공유하기 버튼을 눌렀을 때 */
export type WebScreenSharePayload = BaseWebScreenPayload<"share", WebScreenShareData>;
