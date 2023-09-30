import type { CommonUser } from "./user";

import { ALARM_TYPE_WITH_THUMBNAIL, ALARM_TYPE_WITHOUT_THUMBNAIL } from "../constants/alarm";

export type AlarmTypeWithoutThumbnail = (typeof ALARM_TYPE_WITHOUT_THUMBNAIL)[number];
export type AlarmTypeWithThumbnail = (typeof ALARM_TYPE_WITH_THUMBNAIL)[number];

export type AlarmType = AlarmTypeWithThumbnail | AlarmTypeWithoutThumbnail;

export type AlarmIconMapperBackgroundColor = "roof-orange" | "gray-200";

export interface AlarmIconMapperValue {
  backgroundColor: AlarmIconMapperBackgroundColor | null;
  icon: any;
}

export interface UnReadAlarm {
  /** 안읽은 알람이 존재하는지 여부 */
  isExists: boolean;
}

interface BaseAlarm {
  /** 알람 아이디 */
  id: string;
  /** 알람 제목 */
  title: string;
  /** 알람 내용 */
  content: string;
  /** 알람 링크 */
  link: string | null;
  /** 알람 시간 */
  alarmAt: Date | null;
  /** 읽음 여부 */
  isRead: boolean;
  /** 푸시 여부 */
  isPush: boolean;
  /** 푸시 전송 여부 */
  isPushed: boolean;
  /** 유저 정보 */
  user: CommonUser;
}

interface AlarmWithoutThumbnail extends BaseAlarm {
  /** 알람 타입 */
  alarmType: Exclude<AlarmType, AlarmTypeWithThumbnail>;
}

interface AlarmWithThumbnail extends BaseAlarm {
  /** 알람 타입 */
  alarmType: Extract<AlarmType, AlarmTypeWithThumbnail>;
  thumbnail: string | null;
}

export type Alarm = AlarmWithoutThumbnail | AlarmWithThumbnail;
