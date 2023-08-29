import type { SocialType } from "../types/auth";

import { IconGrayApple, IconGrayKakao, IconGrayNaver } from "public/icons";

export const REQUEST_WITH_AUTH_URL = ["/users/me", "/is-interested"];

export const TOKEN_EXPIRED_MESSAGE = "TOKEN_EXPIRED";
export const TOKEN_EMPTY_MESSAGE = "TOKEN_EMPTY";
export const UNAUTHORIZED_STATUS = 401;

export const SOCIAL_ICON_MAPPER: Record<SocialType, any> = {
  kakao: <IconGrayKakao />,
  apple: <IconGrayApple />,
  naver: <IconGrayNaver />,
} as const;
