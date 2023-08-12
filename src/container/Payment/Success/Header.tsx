"use client";

import { useRouter } from "next/navigation";

import { IconClose } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { replace } = useRouter();

  return (
    <header className={styles.wrapper}>
      <button type="button" className={styles.closeButton} onClick={() => replace("/")}>
        <IconClose />
      </button>
      <p className={styles.title}>결제 완료</p>
    </header>
  );
};

export default Header;
