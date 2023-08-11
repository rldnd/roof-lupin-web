import { CATEGORY_SORT_MENU } from "@/common/constants";
import type { PaginateSpacesQueryParams } from "@/services/space";
import { dayjs } from "@/utils/date";
import { sessionPersistenceAtom } from "@/utils/jotai";
import type { NotNullable } from "@/utils/types";

type BaseCategorySortMenu = Omit<PaginateSpacesQueryParams, "page" | "limit">;
export type CategorySortMenu = NotNullable<Pick<BaseCategorySortMenu, "year" | "month" | "day" | "userCount">> &
  Omit<BaseCategorySortMenu, "year" | "month" | "day" | "userCount">;

export const initialCategorySortMenu: CategorySortMenu = {
  categoryIds: null,
  category: null,
  day: dayjs().date().toString(),
  distance: null,
  lat: null,
  lng: null,
  locationName: null,
  month: (dayjs().month() + 1).toString(),
  sort: "RECENT",
  startAt: null,
  endAt: null,
  isImmediateReservation: null,
  keyword: null,
  maxSize: null,
  minSize: null,
  minPrice: null,
  maxPrice: null,
  serviceIds: null,
  userCount: 2,
  year: dayjs().year().toString(),
};

export const categorySortMenuState = sessionPersistenceAtom<CategorySortMenu>(
  CATEGORY_SORT_MENU,
  initialCategorySortMenu,
);

export type CategorySortMenuInfoFilter = Pick<
  CategorySortMenu,
  "year" | "month" | "day" | "userCount" | "startAt" | "endAt"
>;
