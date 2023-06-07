import type { Gender } from "./user";

export interface Host {
  /** host ID */
  id: string;
  /** 유저 아이디 */
  email: string;
  /** 호스트 이름 */
  name: string;
  /** 호스트 프로필 이미지 */
  profileImage?: string;
  /** 연락처 */
  phoneNumber: string;
  /** 성별 */
  gender: Gender;
}
