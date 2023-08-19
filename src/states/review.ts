import { atom } from "jotai";

import type { PaginateReviewsParams } from "@/services/review";

export type ReviewSortMenu = Omit<PaginateReviewsParams, "page" | "limit" | "spaceId">;

export const initialReviewSortMenu: ReviewSortMenu = {
  hasPhoto: false,
  sort: "CREATED_AT",
};

export const reviewSortMenuState = atom<ReviewSortMenu>(initialReviewSortMenu);

export type ReviewImageIndex = number;
export type ReviewImageTotalCount = number | null;
export const reviewImageIndexState = atom<ReviewImageIndex>(0);
export const reviewImageTotalCountState = atom<ReviewImageTotalCount>(null);
