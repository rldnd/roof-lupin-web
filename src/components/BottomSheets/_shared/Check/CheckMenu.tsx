"use client";

import type { ReactNode } from "react";

import cx from "clsx";
import { range } from "lodash-es";

import { LoadingCheckMenuItem } from "./CheckMenuItem";

import styles from "./checkMenu.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
}

const CheckMenu: React.FC<Props> = ({ className, children }) => {
  return <menu className={cx(styles.wrapper, className)}>{children}</menu>;
};

export default CheckMenu;

export const LoadingCheckMenu: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <menu className={cx(styles.wrapper, className)}>
      {range(5).map((value) => (
        <LoadingCheckMenuItem key={value} />
      ))}
    </menu>
  );
};
