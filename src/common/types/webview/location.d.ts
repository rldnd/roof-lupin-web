import type { GenerateWebviewPayload, WithoutData } from ".";

type BaseWebLocationPayload<T extends string, U = unknown> = GenerateWebviewPayload<"web", "location", T, U>;
type BaseAppLocationPayload<T extends string, U = unknown> = GenerateWebviewPayload<"app", "location", T, U>;

interface PositionDataWithPermission {
  hasPermission: true;
  lat: string;
  lng: string;
}

interface PositionDataWithoutPermission {
  hasPermission: false;
}

export type AppLocationPositionData = PositionDataWithPermission | PositionDataWithoutPermission;

/** 웹에서 위치 정보를 받기 시작해야 하는 시점 */
export type WebLocationInitPayload = BaseWebLocationPayload<"init", WithoutData>;
/** 앱에서 위치 정보를 보내주는 경우 */
export type AppLocationPositionPayload = BaseAppLocationPayload<"position", AppLocationPositionData>;
/** 웹에서 위치 정보 받기를 그만두는 시점 */
export type WebLocationClosePayload = BaseWebLocationPayload<"close", WithoutData>;
