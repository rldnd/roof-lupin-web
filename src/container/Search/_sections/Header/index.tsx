"use client";

import { BackButton, SearchInput } from "@/components";

import { IconBlackLeftChevronExtraLarge } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  return (
    <header className={styles.wrapper}>
      <BackButton className={styles.backButton}>
        <IconBlackLeftChevronExtraLarge />
      </BackButton>
      <SearchInput className={styles.searchInput} placeholder="지역, 공간 이름, 지하철역으로 찾아보세요" />
    </header>
  );
};

export default Header;
