import {
  type QueryFunction,
  type QueryKey,
  type QueryObserverSuccessResult,
  useQuery,
  type UseQueryOptions,
} from "@tanstack/react-query";

import type { AxiosResponse } from "axios";

type SuspenseQueryObserverResult<TData = unknown, TError = unknown> = QueryObserverSuccessResult<TData, TError>;
type UseSuspenseBaseQueryResult<TData, TError> = SuspenseQueryObserverResult<TData, TError>;

type UseSuspenseQueryResult<TData = unknown, TError = unknown> = UseSuspenseBaseQueryResult<TData, TError>;

const useSuspenseQuery = <
  Data = unknown,
  TQueryFnData extends AxiosResponse<Data, any> = AxiosResponse<Data, any>,
  TError = unknown,
  TData extends Data = Data,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseQueryOptions<TQueryFnData, TError, TData, TQueryKey>, "queryKey" | "queryFn">,
): UseSuspenseQueryResult<TData, TError> => {
  return useQuery(queryKey, queryFn, {
    suspense: true,
    ...options,
    select: (data) => {
      return data.data as TData;
    },
  }) as unknown as UseSuspenseQueryResult<TData, TError>;
};

export default useSuspenseQuery;
