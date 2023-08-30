"use client";

import { BaseHeader } from "@/components/Layout";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  return <BaseHeader title="예약 내역" className={styles.wrapper} />;
};

export default Header;
