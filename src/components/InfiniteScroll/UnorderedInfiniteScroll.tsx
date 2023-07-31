"use client";

import { type ReactNode, useEffect, useRef } from "react";

import { useInView } from "react-intersection-observer";

interface Props {
  className?: string;
  root?: HTMLElement;
  isFetching: boolean;
  isSuccess: boolean;
  hasNextPage?: boolean;
  children: ReactNode;
  loadingComponent?: ReactNode;
  id?: string;
  isRootContainer?: boolean;
  fetchNextPage: () => unknown | Promise<unknown>;
}

const UnorderedInfiniteScroll: React.FC<Props> = ({
  className,
  root,
  children,
  fetchNextPage,
  loadingComponent,
  hasNextPage,
  isFetching,
  isSuccess,
  id,
  isRootContainer = false,
}) => {
  const ulRef = useRef<HTMLUListElement>(null);
  const [inViewRef, inView] = useInView({
    root: isRootContainer ? ulRef.current : root,
  });

  useEffect(() => {
    if (inView && isSuccess && !isFetching && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage, isFetching, isSuccess]);

  return (
    <>
      <ul className={className} ref={ulRef} id={id}>
        {children}
        <div ref={inViewRef} />
      </ul>
      {isFetching && loadingComponent}
    </>
  );
};

export default UnorderedInfiniteScroll;
