"use client";

import { IconClose } from "public/icons";

import styles from "./header.module.scss";

interface Props {
  index: number;
  totalCount: number;
  onClose(): void;
}

const Header: React.FC<Props> = ({ index, totalCount, onClose }) => {
  return (
    <header className={styles.wrapper}>
      <span>
        {index + 1}/{totalCount}
      </span>
      <button type="button" aria-label="이미지 자세히 보기 종료" onClick={onClose}>
        <IconClose />
      </button>
    </header>
  );
};

export default Header;
