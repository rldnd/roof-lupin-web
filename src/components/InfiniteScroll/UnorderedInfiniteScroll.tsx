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

const UnorderedInfiniteScroll: React.FC<Props> = ({
  className,
  root,
  children,
  fetchNextPage,
  loadingComponent,
  loadingComponentInList,
  hasNextPage,
  emptyComponent,
  isEmpty = false,
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
      {isEmpty && emptyComponent}
      {!isEmpty && (
        <>
          <ul className={className} ref={ulRef} id={id}>
            {children}
            {isFetching && loadingComponentInList}
            <div ref={inViewRef} />
          </ul>
          {isFetching && loadingComponent}
        </>
      )}
    </>
  );
};

export default UnorderedInfiniteScroll;
