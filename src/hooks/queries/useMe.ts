import { useCallback, useEffect } from "react";

import { type QueryObserverResult, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { LOGOUT_EVENT_NAME } from "@/common/constants";
import type { CommonUser } from "@/common/types/user";
import { getMeApi } from "@/services/user";
import { meState } from "@/states";
import { removeTokens } from "@/utils/auth";
import { isClient } from "@/utils/next";

type Options = Omit<
  UseQueryOptions<CommonUser, unknown, CommonUser, string[]>,
  "queryKey" | "queryFn" | "initialData"
> & {
  initialData?: () => undefined;
};

interface UseMeReturn {
  me: CommonUser | null;
  isLogined: boolean;
  refetchMe: () => Promise<QueryObserverResult<CommonUser>>;
  onLogout(): void;
}

const useMe = (options?: Options): UseMeReturn => {
  const [me, setMe] = useAtom(meState);
  const { refetch } = useQuery(["getMe"], () => getMeApi().then((res) => res.data), {
    staleTime: Infinity,
    onSuccess: (data) => setMe(data),
    onError: () => onLogout(),
    ...options,
    enabled: isClient && options?.enabled,
  });

  const onLogout = useCallback(() => {
    removeTokens();
    setMe(null);
  }, [setMe]);

  // TODO: migrate when alert completes
  useEffect(() => {
    if (!isClient) return;

    window.addEventListener(LOGOUT_EVENT_NAME, onLogout);
    return () => {
      window.removeEventListener(LOGOUT_EVENT_NAME, onLogout);
    };
  }, [onLogout]);

  return {
    me,
    isLogined: me !== null,
    refetchMe: refetch,
    onLogout,
  };
};

export default useMe;
