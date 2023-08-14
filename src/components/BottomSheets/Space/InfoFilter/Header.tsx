"use client";

import type { MouseEventHandler } from "react";

import { IconClose } from "public/icons";

import styles from "./header.module.scss";

interface Props {
  onClose: MouseEventHandler<HTMLElement>;
}

const Header: React.FC<Props> = ({ onClose }) => {
  return (
    <header className={styles.wrapper}>
      <button type="reset" className={styles.reset}>
        초기화
      </button>
      <button type="button" aria-label="종료" className={styles.close} onClick={onClose}>
        <IconClose />
      </button>
    </header>
  );
};

export default Header;
