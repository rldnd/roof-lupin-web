import type { Day } from "./common";

export interface OpenHour {
  /** 아이디 */
  id: string;
  /** 운영 시작시간 */
  startAt: string;
  /** 운영 종료시간 */
  endAt: string;
  /** 요일 */
  day: Day;
}
