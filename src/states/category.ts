import { atom } from "jotai";

import type { PaginateSpacesQueryParams } from "@/services/space";

export type CategorySortMenu = Omit<PaginateSpacesQueryParams, "page" | "limit">;

export const initialCategorySortMenu: CategorySortMenu = {
  categoryIds: null,
  category: null,
  day: null,
  distance: null,
  lat: null,
  lng: null,
  locationName: null,
  month: null,
  sort: "RECENT",
  time: null,
  userCount: null,
  year: null,
};

export const categorySortMenuState = atom<CategorySortMenu>(initialCategorySortMenu);
