"use client";

import { BackButton } from "@/components";

import { IconBlackLeftChevronLarge } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <BackButton className={styles.backButton}>
        <IconBlackLeftChevronLarge />
      </BackButton>
      <span className={styles.title}>내 Q&A</span>
    </header>
  );
};

export default Header;
