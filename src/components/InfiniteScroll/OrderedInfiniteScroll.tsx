"use client";

import { forwardRef, type ReactNode, useEffect } from "react";

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
  fetchNextPage: () => unknown | Promise<unknown>;
}

const OrderedInfiniteList = forwardRef<HTMLOListElement, Props>(
  ({ className, root, children, fetchNextPage, loadingComponent, hasNextPage, isFetching, isSuccess, id }, ref) => {
    const [inViewRef, inView] = useInView({
      root,
    });

    useEffect(() => {
      if (inView && isSuccess && !isFetching && hasNextPage) fetchNextPage();
    }, [inView, fetchNextPage, hasNextPage, isFetching, isSuccess]);

    return (
      <>
        <ol className={className} ref={ref} id={id}>
          {children}
        </ol>
        {isFetching && loadingComponent}
        <div ref={inViewRef} />
      </>
    );
  },
);

export default OrderedInfiniteList;
