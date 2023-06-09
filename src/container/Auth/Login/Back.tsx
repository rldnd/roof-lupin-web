"use client";

import React from "react";

import { useRouter } from "next/navigation";

import styles from "./back.module.scss";

const Header: React.FC = () => {
  const router = useRouter();

  const onClickBack = () => {
    router.back();
  };

  return (
    <button type="button" onClick={onClickBack} className={styles.wrapper}>
      둘러보기
    </button>
  );
};

export default Header;
