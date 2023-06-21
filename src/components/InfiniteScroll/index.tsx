"use client";

import { type ReactNode, useEffect } from "react";

import { useInView } from "react-intersection-observer";

interface Props {
  className?: string;
  root?: HTMLElement;
  isFetching: boolean;
  isSuccess: boolean;
  hasNextPage?: boolean;
  children: ReactNode;
  loadingComponent?: ReactNode;
  fetchNextPage: () => unknown | Promise<unknown>;
}

const InfiniteScroll: React.FC<Props> = ({
  className,
  root,
  children,
  fetchNextPage,
  loadingComponent,
  hasNextPage,
  isFetching,
  isSuccess,
}) => {
  const [ref, inView] = useInView({
    root,
  });

  useEffect(() => {
    if (inView && isSuccess && !isFetching && hasNextPage) fetchNextPage();
  }, [inView, fetchNextPage, hasNextPage, isFetching, isSuccess]);

  return (
    <>
      <ul className={className}>{children}</ul>
      {isFetching && loadingComponent}
      <div ref={ref} />
    </>
  );
};

export default InfiniteScroll;
