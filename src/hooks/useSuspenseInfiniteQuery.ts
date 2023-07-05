import {
  type InfiniteData,
  type InfiniteQueryObserverSuccessResult,
  type QueryFunction,
  type QueryKey,
  useInfiniteQuery,
  type UseInfiniteQueryOptions,
} from "@tanstack/react-query";

import type { PagingDTO } from "@/common/types/common";
import type { AxiosResponse } from "axios";

type SuspenseInfiniteQueryObserverResult<TData = unknown, TError = unknown> = InfiniteQueryObserverSuccessResult<
  TData,
  TError
>;
type UseSuspenseBaseInfiniteQueryResult<TData, TError> = SuspenseInfiniteQueryObserverResult<TData, TError>;

type UseSuspenseInfiniteQueryResult<TData = unknown, TError = unknown> = UseSuspenseBaseInfiniteQueryResult<
  TData,
  TError
>;

const useSuspenseInfiniteQuery = <
  Data = unknown,
  TQueryFnData extends AxiosResponse<PagingDTO<Data>> = AxiosResponse<PagingDTO<Data>>,
  TError = unknown,
  TData extends Data = Data,
  TQueryKey extends QueryKey = QueryKey,
>(
  queryKey: TQueryKey,
  queryFn: QueryFunction<TQueryFnData, TQueryKey>,
  options?: Omit<UseInfiniteQueryOptions<TQueryFnData, TError, TData, TQueryFnData, TQueryKey>, "queryKey" | "queryFn">,
): UseSuspenseInfiniteQueryResult<TData, TError> => {
  return useInfiniteQuery<TQueryFnData, TError, TData, TQueryKey>(queryKey, queryFn, {
    suspense: true,
    ...options,
    select: (data) =>
      ({
        pages: data.pages.flatMap((page) => page.data.data),
        pageParams: data.pageParams,
      } as InfiniteData<TData>),
    getNextPageParam: (lastPage) => (lastPage.data.paging.hasNext ? lastPage.data.paging.page + 1 : undefined),
  }) as unknown as UseSuspenseInfiniteQueryResult<TData, TError>;
};

export default useSuspenseInfiniteQuery;
