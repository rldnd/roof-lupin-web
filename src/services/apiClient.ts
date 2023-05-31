import axios, { AxiosError, isAxiosError as isAxiosErrorApp } from "axios";

import { getAccessToken } from "@/utils/auth";
import { isClient } from "@/utils/next";

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

apiClient.interceptors.request.use((config) => {
  if (!isClient) return config;

  const accessToken = getAccessToken();
  config.headers.Authorization = `Bearer ${accessToken}`;

  return config;
});

apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error);
  },
);

export const isAxiosError = <T>(err: unknown | AxiosError<T>): err is AxiosError<T> => {
  return isAxiosErrorApp(err);
};
