"use client";

import type { CSSProperties, MouseEventHandler, ReactNode } from "react";

import cx from "clsx";

import BackButton from "@/components/BackButton";

import { IconBlackLeftChevronLarge } from "public/icons";

import styles from "./baseHeader.module.scss";

interface Props {
  className?: string;
  style?: CSSProperties;
  title: ReactNode;
  right?: ReactNode;
  replaceUrl?: string;
  onClickBack?: MouseEventHandler<HTMLButtonElement>;
  backHidden?: boolean;
}

const BaseHeader: React.FC<Props> = ({
  className,
  style,
  title,
  right,
  replaceUrl,
  backHidden = false,
  onClickBack,
}) => {
  return (
    <header className={cx(styles.wrapper, className, { [styles.backHidden]: backHidden })} style={style}>
      {!backHidden && !onClickBack && (
        <BackButton className={styles.backButton} replaceUrl={replaceUrl}>
          <IconBlackLeftChevronLarge />
        </BackButton>
      )}
      {!backHidden && onClickBack && (
        <button className={styles.backButton} onClick={onClickBack}>
          <IconBlackLeftChevronLarge />
        </button>
      )}
      <p className={styles.title}>{title}</p>
      {right}
    </header>
  );
};

export default BaseHeader;
