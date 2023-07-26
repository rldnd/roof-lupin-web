import { atom } from "jotai";

import { PaginateSpacesQueryParams } from "@/services/space";
import { dayjs } from "@/utils/date";
import type { NotNullable } from "@/utils/types";

export interface SpaceReservationInfo
  extends NotNullable<Pick<PaginateSpacesQueryParams, "year" | "month" | "day" | "userCount">> {}

export const initialSpaceReservationInfo: SpaceReservationInfo = {
  year: dayjs().year().toString(),
  day: dayjs().date().toString(),
  month: (dayjs().month() + 1).toString(),
  userCount: 2,
};

export const spaceReservationInfoState = atom<SpaceReservationInfo>(initialSpaceReservationInfo);
