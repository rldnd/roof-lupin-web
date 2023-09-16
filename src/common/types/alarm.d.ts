import type { CommonUser } from "./user";

export interface UnReadAlarm {
  /** 안읽은 알람이 존재하는지 여부 */
  isExists: boolean;
}

export interface Alarm {
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
