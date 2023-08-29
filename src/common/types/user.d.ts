import type { SocialType } from "./auth";
import type { DateDTO } from "./common";

export type Gender = "MALE" | "FEMALE";

export interface CommonUser extends DateDTO {
  id: string;
  name: string | null;
  nickname: string;
  email: string | null;
  /** 000 XXXX XXXX (-을 제외한 11자리) */
  phoneNumber: string | null;
  birthYear: string | null;
  birthDay: string | null;
  gender: Gender | null;
  profileImage: string | null;
  /** 성인 인증 여부 */
  isAdult: boolean;
  /** 알림 승인 여부 */
  isAlarmAccepted: boolean;
  /** 유저 소셜 타입 */
  socialType: SocialType;
}

export interface PushToken {
  pushToken: string | null;
}

export interface CountInfo {
  /** 예약 수 */
  reservationCount: number;
  /** qna 수 */
  qnaCount: number;
  /** 쿠폰 수 */
  couponCount: number;
  /** 리뷰 수 */
  reviewCount: number;
}
