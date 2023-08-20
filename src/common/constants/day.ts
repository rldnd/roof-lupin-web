import type { Day } from "@/common/types/common";

export const DAY_MAPPER: Record<Day, string> = {
  MONDAY: "월요일",
  TUESDAY: "화요일",
  WEDNESDAY: "수요일",
  THURSDAY: "목요일",
  FRIDAY: "금요일",
  SATURDAY: "토요일",
  SUNDAY: "일요일",
  HOLIDAY: "공휴일",
} as const;

export const WEEK_DAY_LIST: Day[] = ["MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY"];
export const WEEK_DAY_LIST_KO: string[] = ["월요일", "화요일", "수요일", "목요일", "금요일"];
export const WEEKEND_DAY_LIST: Day[] = ["SATURDAY", "SUNDAY"];
export const WEEKEND_DAY_LIST_KO: string[] = ["토요일", "일요일"];
export const ALL_DAY_LIST: Day[] = [...WEEK_DAY_LIST, ...WEEKEND_DAY_LIST, "HOLIDAY"];
export const ALL_DAY_LIST_KO: string[] = [...WEEK_DAY_LIST_KO, ...WEEKEND_DAY_LIST_KO, "공휴일"];
