import axios, { type AxiosError, isAxiosError as isAxiosErrorApp } from "axios";

import { LOGOUT_EVENT_NAME, TOKEN_EXPIRED_MESSAGE, TOKEN_EXPIRED_STATUS } from "@/common/constants";
import type { Token } from "@/common/types/auth";
import type { ErrorDTO } from "@/common/types/common";
import { getAccessToken, getTokens, removeSocialType, removeTokens, setTokens } from "@/utils/auth";
import { isClient } from "@/utils/next";
import { PromiseHolder } from "@/utils/promiseHolder";

const holder = new PromiseHolder();

interface FetchOptions {
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
}

// 5 minutes
const REVALIDATE = 60 * 5;

/** SSR / SSG / ISR */
export const fetchClient = (url?: string, options?: FetchOptions) => {
  return fetch(`${process.env.NEXT_PUBLIC_API_URL}/api${url}`, {
    next: { revalidate: options?.revalidate ?? REVALIDATE, tags: options?.tags },
    cache: options?.cache,
  });
};

/** api call on client side */
export const apiClient = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_URL}/api/v1`,
  timeout: 5_000,
});

/** To use Route Handlers */
export const apiClientLocal = axios.create({
  baseURL: `${process.env.NEXT_PUBLIC_API_LOCAL_URL}/api`,
});

apiClient.interceptors.request.use(async (config) => {
  if (!isClient) return config;
  if (holder.isLocked) await holder.promise;

  const accessToken = getAccessToken();
  if (accessToken) config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (isAxiosError<ErrorDTO>(error) && error?.response?.data) {
      const { message, statusCode } = error.response.data;

      if (message === TOKEN_EXPIRED_MESSAGE && statusCode === TOKEN_EXPIRED_STATUS) {
        try {
          const { accessToken, refreshToken } = getTokens();
          if (!accessToken || !refreshToken) throw new Error();

          if (!holder.isLocked) {
            holder.hold();

            const refreshResponse = await axios.post<Token>(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/refresh`, {
              accessToken,
              refreshToken,
            });

            const { accessToken: newAccessToken, refreshToken: newRefreshToken } = refreshResponse.data;
            setTokens({ accessToken: newAccessToken, refreshToken: newRefreshToken });

            error.config!.headers.Authorization = `Bearer ${newAccessToken}`;
            holder.successRelease();
          } else await holder.promise;

          return await apiClient(error.config!);
        } catch {
          holder.failRelease();
          removeTokens();
          removeSocialType();
          window.dispatchEvent(new CustomEvent(LOGOUT_EVENT_NAME));
        }
      }
    }

    return Promise.reject(error);
  },
);

export const isAxiosError = <T>(err: unknown | AxiosError<T>): err is AxiosError<T> => {
  return isAxiosErrorApp(err);
};
