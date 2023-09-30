import type { GenerateWebviewPayload, WithoutData } from ".";

type BaseWebCommonPayload<T extends string, U = unknown> = GenerateWebviewPayload<"web", "common", T, U>;
type BaseAppCommonPayload<T extends string, U = unknown> = GenerateWebviewPayload<"app", "common", T, U>;

export interface AppCommonPlatformData {
  platform: "ios" | "android";
}

export interface WebCommonCallData {
  phoneNumber: string;
}

export interface AppCommonAppVersionData {
  version: string;
}

export interface AppCommonGetPermissionData {
  alarm: boolean;
  location: boolean;
}

/** 플랫폼 확인 요청 */
export type WebCommonPlatformPayload = BaseWebCommonPayload<"platform", WithoutData>;
/** 웹뷰 플랫폼 체크 */
export type AppCommonPlatformPayload = BaseAppCommonPayload<"platform", AppCommonPlatformData>;
/** 전화 하기 */
export type WebCommonCallPayload = BaseWebCommonPayload<"call", WebCommonCallData>;
/** 앱 버전 체크 */
export type WebCommonAppVersionPayload = BaseWebCommonPayload<"appVersion", WithoutData>;
/** 앱 버전 체크 */
export type AppCommonAppVersionPayload = BaseAppCommonPayload<"appVersion", AppCommonAppVersionData>;
/** 권한 체크 */
export type WebCommonGetPermissionsPayload = BaseWebCommonPayload<"getPermissions", WithoutData>;
/** 권한 체크 */
export type AppCommonGetPermissionsPayload = BaseAppCommonPayload<"getPermissions", AppCommonGetPermissionData>;
/** 알람 권한 요청 */
export type WebCommonRequestAlarmPermissionPayload = BaseWebCommonPayload<"requestAlarmPermission", WithoutData>;
/** 설정 앱 켜기 */
export type WebCommonOpenSettingsPayload = BaseWebCommonPayload<"openSettings", WithoutData>;
/** 위치 정보 접근 권한 요청 */
export type WebCommonRequestLocationPermissionPayload = BaseWebCommonPayload<"requestLocationPermission", WithoutData>;
