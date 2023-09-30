"use client";

import type { ChangeEventHandler, ReactNode } from "react";

import cx from "clsx";

import { Toggle } from "@/components";

import styles from "./toggleItem.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
  disabled?: boolean;
  name?: string;
  checked: boolean;
  onChange: ChangeEventHandler<HTMLInputElement>;
}

type LoadingProps = Pick<Props, "className" | "children">;

const ToggleItem: React.FC<Props> = ({ className, children, checked, name, onChange, disabled = false }) => {
  return (
    <div className={cx(styles.wrapper, className)}>
      <span className={styles.label}>{children}</span>
      <Toggle checked={checked} onChange={onChange} name={name} disabled={disabled} />
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
