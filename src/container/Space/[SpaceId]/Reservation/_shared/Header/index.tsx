"use client";

import type { MouseEventHandler } from "react";

import { BaseHeader } from "@/components/Layout";

import styles from "./header.module.scss";

interface Props {
  title: string;
  onClickBack?: MouseEventHandler<HTMLButtonElement>;
}

const Header: React.FC<Props> = ({ title, onClickBack }) => {
  return <BaseHeader title={title} className={styles.wrapper} onClickBack={onClickBack} />;
};

export default Header;
