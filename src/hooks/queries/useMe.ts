import { useCallback } from "react";

import { type QueryObserverResult, useQuery, type UseQueryOptions } from "@tanstack/react-query";
import { useAtom } from "jotai";

import type { CommonUser } from "@/common/types/user";
import { getMeApi } from "@/services/user";
import { meState } from "@/states";

type Options = Omit<
  UseQueryOptions<CommonUser, unknown, CommonUser, string[]>,
  "queryKey" | "queryFn" | "initialData"
> & {
  initialData?: () => undefined;
};

interface UseMeReturn {
  me: CommonUser | null;
  refetchMe: () => Promise<QueryObserverResult<CommonUser>>;
  onLogout(): void;
}

const useMe = (options?: Options): UseMeReturn => {
  const [me, setMe] = useAtom(meState);
  const { refetch } = useQuery(["getMe"], () => getMeApi().then((res) => res.data), {
    cacheTime: Infinity,
    onSuccess: (data) => setMe(data),
    ...options,
  });

  const onLogout = useCallback(() => {
    setMe(null);
  }, [setMe]);

  return {
    me,
    refetchMe: refetch,
    onLogout,
  };
};

export default useMe;
