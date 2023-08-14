"use client";

import { BackButton } from "@/components";

import { IconBlackLeftChevronLarge } from "public/icons";

import styles from "./header.module.scss";

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return (
    <header className={styles.wrapper}>
      <BackButton className={styles.back}>
        <IconBlackLeftChevronLarge />
      </BackButton>
      <p className={styles.title}>{title}</p>
    </header>
  );
};

export default Header;
