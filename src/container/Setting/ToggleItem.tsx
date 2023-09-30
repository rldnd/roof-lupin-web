"use client";

import type { ChangeEventHandler, ReactNode } from "react";

import cx from "clsx";

import { Toggle } from "@/components";

import styles from "./toggleItem.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

type LoadingProps = Pick<Props, "className" | "children">;

const ToggleItem: React.FC<Props> = ({ className, children, checked, onChange }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <span className={styles.label}>{children}</span>
      <Toggle checked={checked} onChange={onChange} />
    </div>
  );
};

export default ToggleItem;

export const LoadingToggleItem: React.FC<LoadingProps> = ({ children, className }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <span className={styles.label}>{children}</span>
      <Toggle disabled />
    </div>
  );
};
