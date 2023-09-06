"use client";

import { BackButton } from "@/components";

import { IconBlackLeftChevronLarge, IconHelp } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <BackButton>
        <IconBlackLeftChevronLarge />
      </BackButton>
      <p className={styles.title}>내 후기</p>
      <button type="button" className={styles.helpWrapper}>
        리뷰 정책
        <IconHelp />
      </button>
    </header>
  );
};

export default Header;
