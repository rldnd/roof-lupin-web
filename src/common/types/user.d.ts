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
}

export interface PushToken {
  pushToken: string | null;
}
