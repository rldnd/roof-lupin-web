"use client";

import { BackButton } from "@/components";

import { IconBlackLeftChevronLarge } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <BackButton className={styles.backButton} href="/my-page">
        <IconBlackLeftChevronLarge />
      </BackButton>
      <span className={styles.title}>프로필 편집</span>
    </header>
  );
};

export default Header;
