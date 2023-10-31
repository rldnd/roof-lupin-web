import type { SocialType } from "./auth";
import type { DateDTO } from "./common";

export type Gender = "MALE" | "FEMALE";

export interface UserSetting {
  /** id */
  id: string;
  /** 성인 인증 여부 */
  isAdult: boolean;
  /** 알림 수신 동의 여부 */
  isAlarmAccepted: boolean;
  /** 위치 정보 수집 동의 여부 */
  isLocationInfoAccepted: boolean;
  /** 이메일 수신 동의 여부 */
  isEmailAccepted: boolean;
  /** 카카오톡 알림 수신 동의 여부 */
  isKakaoTalkAccepted: boolean;
  /** 푸시 알림 수신 동의 여부 */
  isPushAccepted: boolean;
}

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
  /** 유저 소셜 타입 */
  socialType: SocialType;
  /** 설정 */
  setting: UserSetting;
}

export interface PushToken {
  /** 유저 아이디 */
  id: string;
  /** 유저 닉네임 */
  nickname: string | null;
  /** 유저 이름 */
  name: string | null;
  /** 푸시 토큰 */
  pushToken: string | null;
  /** 유저 설정 */
  setting: UserSetting;
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

export interface CertificatePhone {
  /** 본인 인증 결과 */
  imp_uid: string;
}
