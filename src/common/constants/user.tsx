import type { SocialType } from "../types/auth";
import type { Gender } from "../types/user";

import { IconGrayApple, IconGrayKakao, IconGrayNaver } from "public/icons";

export const SOCIAL_ICON_MAPPER: Record<SocialType, any> = {
  kakao: <IconGrayKakao />,
  apple: <IconGrayApple />,
  naver: <IconGrayNaver />,
} as const;

export const SOCIAL_TYPE_MAPPER: Record<SocialType, string> = {
  kakao: "카카오톡",
  apple: "애플",
  naver: "네이버",
} as const;

export const GENDER_MAPPER: Record<Gender, string> = {
  MALE: "남성",
  FEMALE: "여성",
} as const;
