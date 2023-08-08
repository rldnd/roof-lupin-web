import { useCallback } from "react";

import { type QueryObserverResult, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { useAtom } from "jotai";

import { LOGOUT_EVENT_NAME } from "@/common/constants";
import type { CommonUser } from "@/common/types/user";
import { getMeApi } from "@/services/user";
import { meState } from "@/states";
import { removeTokens } from "@/utils/auth";
import { isClient } from "@/utils/next";

import useClientEffect from "../useClientEffect";

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
  const queryClient = useQueryClient();

  const [me, setMe] = useAtom(meState);
  const { refetch } = useQuery(["getMe"], () => getMeApi().then((res) => res.data), {
    staleTime: Infinity,
    onSuccess: (data) => {
      setMe(data);
      queryClient.invalidateQueries({
        predicate: (query) => !["getMe", "getMyPushToken"].includes(query.queryKey[0] as string),
      });
    },
    onError: () => onLogout(),
    ...options,
    enabled: isClient && options?.enabled,
    useErrorBoundary: false,
  });

  const onLogout = useCallback(() => {
    removeTokens();
    setMe(null);
  }, [setMe]);

  // TODO: migrate when alert completes
  useClientEffect(() => {
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
