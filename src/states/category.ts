import { CATEGORY_SORT_MENU } from "@/common/constants";
import type { PaginateSpacesQueryParams } from "@/services/space";
import { sessionPersistenceAtom } from "@/utils/jotai";

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
  startAt: null,
  endAt: null,
  userCount: null,
  year: null,
};

export const categorySortMenuState = sessionPersistenceAtom<CategorySortMenu>(
  CATEGORY_SORT_MENU,
  initialCategorySortMenu,
);
