"use client";

import { ComponentProps } from "react";

import cx from "clsx";

import { IconActiveCheckLarge } from "public/icons";

import styles from "./sortMenuItem.module.scss";

interface Props extends ComponentProps<"button"> {
  wrapperClassName?: string;
  isActive: boolean;
}

const SortMenuItem: React.FC<Props> = ({ wrapperClassName, isActive, className, children, ...props }) => {
  return (
    <li className={cx(styles.wrapper, wrapperClassName)}>
      <button type="button" className={cx(className, { [styles.active]: isActive })} {...props}>
        {children}
        {isActive && <IconActiveCheckLarge />}
      </button>
    </li>
  );
};

export default SortMenuItem;
