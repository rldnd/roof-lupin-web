"use client";

import { useRef, useState } from "react";

import cx from "clsx";

import { ArrowButton } from "@/components/Common";
import { useClientEffect } from "@/hooks";

import styles from "./content.module.scss";

interface Props {
  content: string;
}

const Content: React.FC<Props> = ({ content }) => {
  const contentRef = useRef<HTMLParagraphElement>(null);
  const [hasMoreButton, setHasMoreButton] = useState(false);
  const [isClickedViewMore, setIsClickedViewMore] = useState(false);

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

export default Content;
