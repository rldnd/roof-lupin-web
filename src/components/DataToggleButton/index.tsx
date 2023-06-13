"use client";

import { MouseEventHandler, type ReactElement, type ReactNode, useCallback, useEffect, useRef, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import cx from "clsx";

import { useDebounceCallback } from "@/hooks";
import { genericMemo } from "@/utils/genericMemo";

import styles from "./dataToggleButton.module.scss";

interface DataKey<T> {
  valueKey: keyof T;
  idKey: keyof T;
}

interface Props<T> {
  id: unknown;
  queryFn: (...args: any[]) => Promise<T[]>;
  activeFn: (key: any) => Promise<unknown>;
  inactiveFn: (key: any) => Promise<unknown>;
  queryKey: readonly unknown[];
  dataKey: DataKey<T>;
  children: ReactNode;
  className?: string;
  debounceDelay?: number;
}

/** 리스트 중 한 데이터에 대해 좋아요 / 저장 / 찜 등의 기능을 구현할 때 사용하는 컴포넌트 입니다.
 * @param {unknown} id - 리스트에서 선택한 데이터의 id 값
 * @param {(...args: any[]) => Promise<T[]>} queryFn - 리스트 데이터를 가져오는 함수
 * @param {(key: any) => Promise<unknown>} activeFn - 좋아요 / 저장 / 찜 등을 활성화 하는 함수
 * @param {(key: any) => Promise<unknown>} inactiveFn - 좋아요 / 저장 / 찜 등을 비활성화 하는 함수
 * @param {readonly unknown[]} queryKey - useQuery 리스트를 가져오는데 사용하는 queryKey
 * @param {DataKey<T>} dataKey - 리스트 데이터에서 좋아요 / 저장 / 찜 등을 판단하는 키 값과 id 키 값
 * @param {ReactNode} children - 활성화 / 비활성화 상태에 따라 보여줄 컴포넌트
 * @param {string} className - 컴포넌트에 적용할 클래스 이름 (data-key를 이용해 분기 가능)
 * @param {number} debounceDelay - debounce delay
 */
const DataListToggleButton = <T,>({
  id,
  queryKey,
  queryFn,
  activeFn,
  inactiveFn,
  dataKey: { valueKey, idKey },
  className,
  children,
  debounceDelay = 1000,
}: Props<T>): ReactElement => {
  const beforeActive = useRef(false);
  const [isActive, setIsActive] = useState(false);

  const { data, refetch } = useQuery(queryKey, queryFn, {
    select: (response) => response.find((item) => item[idKey] === id) as T,
    suspense: true,
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

    setIsActive((data[valueKey] as boolean) ?? false);
    beforeActive.current = (data[valueKey] as boolean) ?? false;
  }, [data, valueKey]);

  return (
    <button
      type="button"
      className={cx(styles.wrapper, className)}
      data-active={`${Boolean(isActive)}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default genericMemo(DataListToggleButton);
