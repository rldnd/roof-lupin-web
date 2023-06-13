import type { Nullable } from "./types";
import { ACCESS_TOKEN, REFRESH_TOKEN, SOCIAL_TYPE } from "@/common/constants";
import type { SocialType, Token } from "@/common/types/auth";

import { isClient } from "./next";

export const getAccessToken = (): string | null => {
  if (!isClient) return null;
  return localStorage.getItem(ACCESS_TOKEN);
};

export const getRefreshToken = (): string | null => {
  if (!isClient) return null;
  return localStorage.getItem(REFRESH_TOKEN);
};

export const setAccessToken = (accessToken: string): void => {
  if (!isClient) return;
  localStorage.setItem(ACCESS_TOKEN, accessToken);
};

export const setRefreshToken = (refreshToken: string): void => {
  if (!isClient) return;
  localStorage.setItem(REFRESH_TOKEN, refreshToken);
};

export const getTokens = (): Nullable<Token> => {
  const accessToken = getAccessToken() ?? null;
  const refreshToken = getRefreshToken() ?? null;

  return { accessToken, refreshToken };
};

export const setTokens = ({ accessToken, refreshToken }: Token): void => {
  if (!isClient) return;

  setAccessToken(accessToken);
  setRefreshToken(refreshToken);
};

export const removeAccessToken = (): void => {
  if (!isClient) return;
  localStorage.removeItem(ACCESS_TOKEN);
};

export const removeRefreshToken = (): void => {
  if (!isClient) return;
  localStorage.removeItem(REFRESH_TOKEN);
};

export const removeTokens = (): void => {
  removeAccessToken();
  removeRefreshToken();
};

export const getSocialType = (): SocialType | null => {
  if (!isClient) return null;
  return localStorage.getItem(SOCIAL_TYPE) as SocialType;
};

export const setSocialType = (type: SocialType): void => {
  if (!isClient) return;
  localStorage.setItem(SOCIAL_TYPE, type);
};

export const removeSocialType = (): void => {
  if (!isClient) return;
  localStorage.removeItem(SOCIAL_TYPE);
};
