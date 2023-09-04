import type { DateDTO } from "./common";

import { BANK_CODE } from "../constants/bank";

export interface Host extends DateDTO {
  /** host ID */
  id: string;
  /** 유저 아이디 */
  email: string;
  /** 호스트 이름 */
  name: string;
  /** 호스트 프로필 이미지 */
  profileImage: string | null;
  /** 연락처 */
  phoneNumber: string;
  /** 차단 여부 */
  isBlocked: boolean;
  /** 차단 해제일 */
  unBlockAt: Date | null;
}

export type BankCode = keyof typeof BANK_CODE;

export interface HostAccount {
  /** 공간주 사업자 및 계좌 정보 id */
  id: string;
  /** 은행 코드 */
  backCode: BankCode;
  /** 사업자 등록번호 */
  businessRegistrationNumber: string | null;
  /** 사업자등록증 파일 */
  businessRegistrationFile: string | null;
  /** 상호명 */
  businessName: string | null;
  /** 계좌번호 */
  account: string;
  /** 계좌 소유자 이름 */
  accountOwner: string;
}

export interface HostDetail extends Host {
  account: HostAccount;
}
