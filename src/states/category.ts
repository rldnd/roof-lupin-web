import { CATEGORY_SORT_MENU } from "@/common/constants";
import type { PaginateSpacesQueryParams } from "@/services/space";
import { dayjs } from "@/utils/date";
import { sessionPersistenceAtom } from "@/utils/jotai";

export type CategorySortMenu = Omit<PaginateSpacesQueryParams, "page" | "limit">;

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
  userCount: 2,
  year: dayjs().year().toString(),
};

export const categorySortMenuState = sessionPersistenceAtom<CategorySortMenu>(
  CATEGORY_SORT_MENU,
  initialCategorySortMenu,
);
