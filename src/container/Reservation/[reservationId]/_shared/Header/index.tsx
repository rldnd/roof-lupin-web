"use client";

import { BaseHeader } from "@/components/Layout";

import styles from "./header.module.scss";

interface Props {
  title?: string;
}

const Header: React.FC<Props> = ({ title }) => {
  return <BaseHeader title={title ?? "예약 내역"} className={styles.wrapper} />;
};

export default Header;
