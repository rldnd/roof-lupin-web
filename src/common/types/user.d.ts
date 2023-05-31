export type Gender = "남성" | "여성";

export interface CommonUser {
  id: string;
  name: string | null;
  nickname: string;
  email: string | null;
  /** 000 XXXX XXXX */
  phoneNumber: string | null;
  birth: string | null;
  gender: Gender | null;
  profileImage: string | null;

  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}
