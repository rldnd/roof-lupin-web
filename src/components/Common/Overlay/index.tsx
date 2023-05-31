"use client";

import React, { memo, type MouseEventHandler } from "react";

import cx from "clsx";

import styles from "./overlay.module.scss";

interface Props {
  onClose?: MouseEventHandler<HTMLDivElement>;
  isOverlayTransparent: boolean;
}

const Overlay: React.FC<Props> = ({ onClose, isOverlayTransparent }) => {
  return (
    <div
      role="button"
      tabIndex={0}
      aria-label="modal overlay"
      className={cx(styles.wrapper, {
        [styles.isTransparent]: isOverlayTransparent,
      })}
      onClick={onClose}
    />
  );
};

export default memo(Overlay);
