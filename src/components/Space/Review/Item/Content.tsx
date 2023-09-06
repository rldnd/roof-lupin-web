"use client";

import { memo, useRef, useState } from "react";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import { ArrowButton } from "@/components/Common";
import { useClientEffect } from "@/hooks";

import styles from "./content.module.scss";

interface Props {
  content: string;
  isShowAll: boolean;
}

const Content: React.FC<Props> = ({ content, isShowAll }) => {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [hasMoreButton, setHasMoreButton] = useState(isShowAll);
  const [isClickedViewMore, setIsClickedViewMore] = useState(isShowAll);

  useClientEffect(() => {
    if (!contentRef.current) return;
    if (contentRef.current.scrollHeight !== contentRef.current.offsetHeight) setHasMoreButton(true);
  }, [isClickedViewMore]);

  return (
    <p className={cx(styles.wrapper, { [styles.isClickedViewMore]: isClickedViewMore })} ref={contentRef}>
      {content}
      <span className={cx(styles.moreButton, { [styles.isShow]: hasMoreButton && !isClickedViewMore })}>
        <ArrowButton direction="down" color="primary" onClick={() => setIsClickedViewMore(true)}>
          더보기
        </ArrowButton>
      </span>
    </p>
  );
};

export default memo(Content);

export const LoadingContent: React.FC = memo(() => {
  return <Skeleton width="100%" height="200px" containerClassName={styles.wrapper} />;
});
