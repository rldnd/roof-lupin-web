"use client";

import { BaseHeader } from "@/components/Layout";

import styles from "./header.module.scss";

interface Props {
  title: string;
  href?: string;
}

const Header: React.FC<Props> = ({ title, href }) => {
  return <BaseHeader title={title} className={styles.wrapper} href={href} />;
};

export default Header;
