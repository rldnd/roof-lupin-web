"use client";

import { MouseEventHandler, type ReactElement, type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";

import { useDebounceCallback } from "@/hooks";
import { genericMemo } from "@/utils/genericMemo";

type CheckIsArray<T> = T extends unknown[] ? true : false;
type GetArrayType<T> = T extends Array<infer R> ? R : never;

type BaseDataKey<T, IsArray extends boolean> = IsArray extends true
  ? {
      valueKey: keyof T;
      idKey: keyof T;
    }
  : { valueKey: keyof T };

type DataKey<T> = CheckIsArray<T> extends true ? BaseDataKey<GetArrayType<T>, true> : BaseDataKey<T, false>;

interface Props<T> {
  id: unknown;
  hasQueryFnIdArg?: boolean;
  queryFn: (...args: any[]) => Promise<T>;
  activeFn: (key: any) => Promise<unknown>;
  inactiveFn: (key: any) => Promise<unknown>;
  queryKey: readonly unknown[];
  dataKey: DataKey<T>;
  children: ReactNode;
  className?: string;
  debounceDelay?: number;
}

/** 리스트 중 한 데이터 혹은 데이터 하나에 대해서 좋아요 / 저장 / 찜 등의 기능을 구현할 때 사용하는 컴포넌트 입니다.
 * @param  id - 선택한 데이터의 id 값
 * @param  hasQueryFnIdArg - queryFn에 id를 인자로 넘겨줄지 여부
 * @param  queryFn - 데이터를 가져오는 함수
 * @param  activeFn - 좋아요 / 저장 / 찜 등을 활성화 하는 함수
 * @param  inactiveFn - 좋아요 / 저장 / 찜 등을 비활성화 하는 함수
 * @param queryKey - useQuery 리스트를 가져오는데 사용하는 queryKey
 * @param  dataKey - 데이터에서 좋아요 / 저장 / 찜 등을 판단하는 키 값과 id 키 값
 * @param  children - 활성화 / 비활성화 상태에 따라 보여줄 컴포넌트
 * @param  className - 컴포넌트에 적용할 클래스 이름 (data-active를 이용해 분기 가능)
 * @param  debounceDelay - debounce delay
 */
const DataToggleButton = <T,>({
  id,
  hasQueryFnIdArg = false,
  queryKey,
  queryFn: queryFnProps,
  activeFn,
  inactiveFn,
  dataKey,
  className,
  children,
  debounceDelay = 1000,
}: Props<T>): ReactElement => {
  const beforeActive = useRef(false);
  const [isActive, setIsActive] = useState(false);

  const queryFn = useCallback(() => {
    if (hasQueryFnIdArg) return queryFnProps(id);
    return queryFnProps();
  }, [hasQueryFnIdArg, id, queryFnProps]);

  const { data, refetch } = useQuery(queryKey, queryFn, {
    select: (response) => {
      if (Array.isArray(response) && "idKey" in dataKey) {
        return response.find((item) => (item as GetArrayType<T>)[dataKey.idKey as keyof typeof item] === id);
      }
      return response;
    },
  });

  const { mutate: active } = useMutation(activeFn, { onSuccess: () => refetch() });
  const { mutate: inactive } = useMutation(inactiveFn, { onSuccess: () => refetch() });

  const handleActive = useDebounceCallback((isDataChanged: boolean, isActive: boolean, id: any) => {
    if (!isDataChanged) return;

    if (isActive) active(id);
    if (!isActive) inactive(id);
  }, debounceDelay);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(() => {
    setIsActive((prev) => {
      const isDataChanged = beforeActive.current !== !prev;
      handleActive(isDataChanged, !prev, id);

      return !prev;
    });
  }, [handleActive, id]);

  useEffect(() => {
    if (!data) return;

    setIsActive((data[dataKey.valueKey as keyof typeof data] as boolean) ?? false);
    beforeActive.current = (data[dataKey.valueKey as keyof typeof data] as boolean) ?? false;
  }, [data, dataKey.valueKey]);

  return (
    <button type="button" className={className} data-active={`${Boolean(isActive)}`} onClick={onClick}>
      {children}
    </button>
  );
};

export default genericMemo(DataToggleButton);
