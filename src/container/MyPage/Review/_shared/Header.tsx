"use client";

import { useRouter } from "next/navigation";

import { IconBlackLeftChevronLarge, IconHelp } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  const { back } = useRouter();

  return (
    <header className={styles.wrapper}>
      <button type="button" aria-label="뒤로 가기" onClick={back}>
        <IconBlackLeftChevronLarge />
      </button>
      <p className={styles.title}>내 후기</p>
      <button type="button" className={styles.helpWrapper}>
        리뷰 정책
        <IconHelp />
      </button>
    </header>
  );
};

export default Header;
