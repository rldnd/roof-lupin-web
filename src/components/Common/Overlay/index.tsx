"use client";

import React, { memo, type MouseEventHandler } from "react";

import cx from "clsx";

import styles from "./overlay.module.scss";

interface Props {
  onClose?: MouseEventHandler<HTMLDivElement>;
  isOverlayTransparent: boolean;
  className?: string;
}

const Overlay: React.FC<Props> = ({ onClose, isOverlayTransparent, className }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="overlay"
      className={cx(styles.wrapper, className, {
        [styles.isTransparent]: isOverlayTransparent,
      })}
      onClick={onClose}
    />
  );
};

export default memo(Overlay);
