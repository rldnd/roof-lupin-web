"use client";

import { BackButton } from "@/components";

import { IconClose } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <BackButton className={styles.closeButton}>
        <IconClose />
      </BackButton>
    </header>
  );
};

export default Header;
