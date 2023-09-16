"use client";

import { type ReactNode, useEffect, useRef } from "react";

import { useInView } from "react-intersection-observer";

interface Props {
  className?: string;
  root?: HTMLElement;
  isFetching: boolean;
  isSuccess: boolean;
  isEmpty?: boolean;
  hasNextPage?: boolean;
  children: ReactNode;
  loadingComponent?: ReactNode;
  loadingComponentInList?: ReactNode;
  emptyComponent?: ReactNode;
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
  emptyComponent,
  isEmpty = false,
  loadingComponentInList,
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
      {isEmpty && emptyComponent}
      {!isEmpty && (
        <>
          <ol className={className} ref={olRef} id={id}>
            {children}
            {isFetching && loadingComponentInList}
            <div ref={inViewRef} />
          </ol>
          {isFetching && loadingComponent}
        </>
      )}
    </>
  );
};

export default OrderedInfiniteScroll;
