import type { GenerateWebviewPayload, WithoutData } from ".";
import type { Location } from "../location";

type BaseWebMapPayload<T extends string, U = unknown> = GenerateWebviewPayload<"web", "map", T, U>;
type BaseAppMapPayload<T extends string, U = unknown> = GenerateWebviewPayload<"app", "map", T, U>;

/** 내 주변 페이지에서 현재 정보를 가져오기 위해 요청 */
export type WebMapRequestCurrentPositionPayload = BaseWebMapPayload<"requestCurrentPosition", WithoutData>;
/** 현재 정보를 가져옴 */
export type AppMapCurrentPositionPayload = BaseAppMapPayload<"currentPosition", Pick<Location, "lat" | "lng">>;
/** 정보 가져오는 stream cancel */
export type WebMapCancelCurrentPositionPayload = BaseWebMapPayload<"cancelCurrentPosition", WithoutData>;
