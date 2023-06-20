"use client";

import type { CSSProperties, ReactNode } from "react";

import cx from "clsx";

import BackButton from "@/components/BackButton";

import { IconBlackLeftChevronLarge } from "public/icons";

import styles from "./baseHeader.module.scss";

interface Props {
  className?: string;
  style?: CSSProperties;
  title: string;
  right?: ReactNode;
  replaceUrl?: string;
}

const BaseHeader: React.FC<Props> = ({ className, style, title, right, replaceUrl }) => {
  return (
    <header className={cx(styles.wrapper, className)} style={style}>
      <BackButton className={styles.backButton} replaceUrl={replaceUrl}>
        <IconBlackLeftChevronLarge />
      </BackButton>
      <p className={styles.title}>{title}</p>
      {right}
    </header>
  );
};

export default BaseHeader;
