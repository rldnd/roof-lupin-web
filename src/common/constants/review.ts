import type { ReviewSort } from "../types/review";

export const MY_REVIEW_TABS_MAPPER = {
  write: "리뷰 작성",
  list: "작성한 리뷰",
} as const;

export const REVIEW_SORT = ["CREATED_AT", "SCORE_HIGH", "SCORE_LOW"] as const;

export const REVIEW_SORT_MAPPER: Record<ReviewSort, string> = {
  CREATED_AT: "최근 작성 순",
  SCORE_HIGH: "별점 높은 순",
  SCORE_LOW: "별점 낮은 순",
};
