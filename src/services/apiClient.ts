import { notFound } from "next/navigation";

import axios, { type AxiosError, isAxiosError as isAxiosErrorApp } from "axios";

import {
  DEFAULT_REVALIDATE,
  LOGOUT_EVENT_NAME,
  REQUEST_WITH_AUTH_URL,
  TOKEN_EXPIRED_MESSAGE,
  UNAUTHORIZED_STATUS,
} from "@/common/constants";
import type { Token } from "@/common/types/auth";
import type { ErrorDTO } from "@/common/types/common";
import { getAccessToken, getTokens, removeTokens, setTokens } from "@/utils/auth";
import { isClient } from "@/utils/next";
import { PromiseHolder } from "@/utils/promiseHolder";

const holder = new PromiseHolder();

interface FetchOptions {
  revalidate?: number;
  tags?: string[];
  cache?: RequestCache;
}

/** SSR / SSG / ISR */
export const fetchClient = async <T>(url?: string, options?: FetchOptions): Promise<T> => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/v1${url}`, {
    next: { revalidate: options?.revalidate ?? DEFAULT_REVALIDATE, tags: options?.tags },
    cache: options?.cache,
  });

  if (response.status === 404) return notFound();

  const data = (await response.json()) as T;
  return data;
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

  const abortController = new AbortController();

  if (!accessToken) {
    REQUEST_WITH_AUTH_URL.forEach((url) => {
      if (config.url?.includes(url)) abortController.abort();
    });
  }

  return { ...config, signal: abortController.signal };
});

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (!isClient) return Promise.reject(error);
    if (isAxiosError<ErrorDTO>(error) && error?.response?.data) {
      const { message, statusCode } = error.response.data;

      if (message === TOKEN_EXPIRED_MESSAGE && statusCode === UNAUTHORIZED_STATUS) {
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

export const getErrorMessage = (err: unknown, fallbackMessage: string) => {
  return isAxiosError<ErrorDTO>(err) && err.response ? err.response.data.message : fallbackMessage;
};
