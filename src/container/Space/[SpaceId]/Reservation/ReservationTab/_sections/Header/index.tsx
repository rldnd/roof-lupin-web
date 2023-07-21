"use client";

import { BaseHeader } from "@/components/Layout";

import { IconGrayHome } from "public/icons";

import styles from "./header.module.scss";

const Header: React.FC = () => {
  return <BaseHeader title="예약" right={<IconGrayHome />} className={styles.wrapper} />;
};

export default Header;
