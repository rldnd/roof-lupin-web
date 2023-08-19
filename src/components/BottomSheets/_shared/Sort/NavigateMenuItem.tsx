"use client";

import { ComponentProps } from "react";

import Link from "next/link";

import cx from "clsx";

import { IconActiveCheckLarge } from "public/icons";

import styles from "./sortMenuItem.module.scss";

interface Props extends ComponentProps<"button"> {
  wrapperClassName?: string;
  isActive: boolean;
  href: string;
}

const SortMenuItem: React.FC<Props> = ({ wrapperClassName, href, isActive, className, children, ...props }) => {
  return (
    <li className={cx(styles.wrapper, wrapperClassName)}>
      <Link href={href}>
        <button type="button" className={cx(className, { [styles.active]: isActive })} {...props}>
          {children}
          {isActive && <IconActiveCheckLarge />}
        </button>
      </Link>
    </li>
  );
};

export default SortMenuItem;
