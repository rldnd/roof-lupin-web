import { atom } from "jotai";

import { PaginateSpacesQueryParams } from "@/services/space";

// TODO: 상세 페이지에서 패키지 or 시간을 지정할 수 있는 기능이 있다면 그 정보 또한 이곳에 포함
export interface SpaceReservationInfo extends Pick<PaginateSpacesQueryParams, "year" | "month" | "day" | "userCount"> {}

export const initialSpaceReservationInfo: SpaceReservationInfo = {
  year: null,
  day: null,
  month: null,
  userCount: null,
};

export const spaceReservationInfoState = atom<SpaceReservationInfo>(initialSpaceReservationInfo);
