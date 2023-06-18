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
}

const BaseHeader: React.FC<Props> = ({ className, style, title, right }) => {
  return (
    <header className={cx(styles.wrapper, className)} style={style}>
      <BackButton className={styles.backButton}>
        <IconBlackLeftChevronLarge />
      </BackButton>
      <h1 className={styles.title}>{title}</h1>
      {right}
    </header>
  );
};

export default BaseHeader;