"use client";

import type { ReactNode } from "react";

import Link from "next/link";

import cx from "clsx";

import styles from "./anchorItem.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
  href: string;
}

const AnchorItem: React.FC<Props> = ({ className, children, href }) => {
  return (
    <Link className={cx(styles.wrapper, className)} href={href}>
      {children}
    </Link>
  );
};

export default AnchorItem;
