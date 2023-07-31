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

const OrderedInfiniteScroll: React.FC<Props> = ({
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
  const olRef = useRef<HTMLOListElement>(null);
  const [inViewRef, inView] = useInView({
    root: isRootContainer ? olRef.current : root,
  });

  useEffect(() => {
    if (inView && isSuccess && !isFetching && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage, isFetching, isSuccess]);

  return (
    <>
      <ol className={className} ref={olRef} id={id}>
        {children}
        <div ref={inViewRef} />
      </ol>
      {isFetching && loadingComponent}
    </>
  );
};

export default OrderedInfiniteScroll;
