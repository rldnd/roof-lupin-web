import { atom } from "jotai";

import type { CreateReview, UpdateReview } from "@/common/types/review";
import type { PaginateReviewsParams } from "@/services/review";

export type ReviewSortMenu = Omit<PaginateReviewsParams, "page" | "limit" | "spaceId">;

export const initialReviewSortMenu: ReviewSortMenu = {
  hasPhoto: false,
  sort: "CREATED_AT",
};

export interface TempImage {
  file: File;
  preview: string;
}

export interface UpdateTempImage {
  file?: File;
  preview: string;
}

export interface TempCreateReviewBody extends CreateReview {
  tempImages: TempImage[];
}

export const initialCreateReviewBody: TempCreateReviewBody = {
  content: "",
  images: [],
  reservationId: "",
  score: 0,
  spaceId: "",
  tempImages: [],
};

export interface TempUpdateReviewBody extends UpdateReview {
  tempImages: UpdateTempImage[];
}

export const initialUpdateReviewBody: TempUpdateReviewBody = {
  content: "",
  images: [],
  score: 0,
  tempImages: [],
  reviewId: "",
};

export const reviewSortMenuState = atom<ReviewSortMenu>(initialReviewSortMenu);

export type ReviewImageIndex = number;
export type ReviewImageTotalCount = number | null;
export const reviewImageIndexState = atom<ReviewImageIndex>(0);
export const reviewImageTotalCountState = atom<ReviewImageTotalCount>(null);
export const createReviewBodyState = atom<TempCreateReviewBody>(initialCreateReviewBody);
export const updateReviewBodyState = atom<TempUpdateReviewBody>(initialUpdateReviewBody);
