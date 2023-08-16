"use client";

import { useRouter } from "next/navigation";

import { IconClose } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { back } = useRouter();

  return (
    <header className={styles.wrapper}>
      <button type="button" aria-label="뒤로가기" className={styles.closeButton} onClick={back}>
        <IconClose />
      </button>
    </header>
  );
};

export default Header;
