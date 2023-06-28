import { atom } from "jotai";

import type { PaginateSpacesQueryParams } from "@/services/space";

export type CategorySortMenu = Omit<PaginateSpacesQueryParams, "page" | "limit">;

// TODO: lat, lng 어떻게 할 것인지
export const initialCategorySortMenu: CategorySortMenu = {
  categoryIds: null,
  category: null,
  day: null,
  distance: null,
  lat: "37",
  lng: "127",
  locationName: null,
  month: null,
  sort: "RECENT",
  time: null,
  userCount: null,
  year: null,
};

export const categorySortMenuState = atom<CategorySortMenu>(initialCategorySortMenu);
