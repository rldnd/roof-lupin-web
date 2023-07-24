import { atom } from "jotai";

import { PaginateSpacesQueryParams } from "@/services/space";

export interface SpaceReservationInfo extends Pick<PaginateSpacesQueryParams, "year" | "month" | "day" | "userCount"> {}

export const initialSpaceReservationInfo: SpaceReservationInfo = {
  year: null,
  day: null,
  month: null,
  userCount: null,
};

export const spaceReservationInfoState = atom<SpaceReservationInfo>(initialSpaceReservationInfo);
