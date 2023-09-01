import { RESERVATION_INFO, SPACE_SORT_MENU } from "@/common/constants";
import type { PaginateSpacesQueryParams } from "@/services/space";
import { dayjs } from "@/utils/date";
import { sessionPersistenceAtom } from "@/utils/jotai";
import type { NotNullable } from "@/utils/types";

export interface SpaceReservationInfo
  extends NotNullable<Pick<PaginateSpacesQueryParams, "year" | "month" | "day" | "userCount">> {}

export const initialSpaceReservationInfo: SpaceReservationInfo = {
  year: dayjs().year(),
  day: dayjs().date(),
  month: dayjs().month() + 1,
  userCount: 2,
};

export const spaceReservationInfoState = sessionPersistenceAtom<SpaceReservationInfo>(
  RESERVATION_INFO,
  initialSpaceReservationInfo,
);

type BaseSpaceSortMenu = Omit<PaginateSpacesQueryParams, "page" | "limit">;
export type SpaceSortMenu = NotNullable<Pick<BaseSpaceSortMenu, "year" | "month" | "day" | "userCount">> &
  Omit<BaseSpaceSortMenu, "year" | "month" | "day" | "userCount">;

export const initialSpaceSortMenu: SpaceSortMenu = {
  categoryIds: null,
  category: null,
  day: dayjs().date(),
  distance: null,
  lat: null,
  lng: null,
  locationName: null,
  month: dayjs().month() + 1,
  sort: "RECENT",
  startAt: null,
  endAt: null,
  locationFilterTopicIds: null,
  isImmediateReservation: null,
  keyword: null,
  maxSize: null,
  minSize: null,
  minPrice: null,
  maxPrice: null,
  serviceIds: null,
  userCount: 2,
  year: dayjs().year(),
};

export const spaceSortMenuState = sessionPersistenceAtom<SpaceSortMenu>(SPACE_SORT_MENU, initialSpaceSortMenu);

export type SpaceSortMenuInfoFilter = Pick<SpaceSortMenu, "year" | "month" | "day" | "userCount" | "startAt" | "endAt">;
