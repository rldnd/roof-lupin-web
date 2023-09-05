"use client";

import { useRouter } from "next/navigation";

import { IconBlackLeftChevronLarge } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { replace } = useRouter();

  return (
    <header className={styles.wrapper}>
      <button type="button" className={styles.backButton} onClick={() => replace("/my-page")}>
        <IconBlackLeftChevronLarge />
      </button>
      <span className={styles.title}>내 Q&A</span>
    </header>
  );
};

export default Header;
