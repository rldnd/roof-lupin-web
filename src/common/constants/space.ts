import type { SpaceSort } from "../types/space";

export const SPACE_SORT = ["POPULARITY", "RECENT", "DISTANCE", "PRICE_HIGH", "PRICE_LOW"] as const;

export const SPACE_SORT_MAPPER: Record<SpaceSort, string> = {
  POPULARITY: "평점 높은 순",
  DISTANCE: "거리 순",
  PRICE_HIGH: "가격 높은 순",
  PRICE_LOW: "가격 낮은 순",
  RECENT: "최신 순",
};
