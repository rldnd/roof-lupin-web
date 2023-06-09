import type { Nullable } from "./types";
import { ACCESS_TOKEN, REFRESH_TOKEN, SOCIAL_TYPE } from "@/common/constants";
import type { SocialType, Token } from "@/common/types/auth";

export const getAccessToken = (): string | null => {
  return localStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem(REFRESH_TOKEN);
};

export const setAccessToken = (accessToken: string): void => {
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const setRefreshToken = (refreshToken: string): void => {
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getTokens = (): Nullable<Token> => {
  const accessToken = getAccessToken() ?? null;
  const refreshToken = getRefreshToken() ?? null;

  return { accessToken, refreshToken };
};

export const setTokens = ({ accessToken, refreshToken }: Token): void => {
  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

export const removeAccessToken = (): void => {
  localStorage.removeItem(ACCESS_TOKEN);
};

export const removeRefreshToken = (): void => {
  localStorage.removeItem(REFRESH_TOKEN);
};

export const removeTokens = (): void => {
  removeAccessToken();
  removeRefreshToken();
};

export const getSocialType = (): SocialType | null => {
  return localStorage.getItem(SOCIAL_TYPE) as SocialType;
};

export const setSocialType = (type: SocialType): void => {
  localStorage.setItem(SOCIAL_TYPE, type);
};

export const removeSocialType = (): void => {
  localStorage.removeItem(SOCIAL_TYPE);
};
