import type { DateDTO } from "./common";

export type Gender = "남성" | "여성";

export interface CommonUser extends DateDTO {
  id: string;
  name: string | null;
  nickname: string;
  email: string | null;
  /** 000 XXXX XXXX (-을 제외한 11자리) */
  phoneNumber: string | null;
  birth: string | null;
  gender: Gender | null;
  profileImage: string | null;
}
