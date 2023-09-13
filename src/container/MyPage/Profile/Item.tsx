"use client";

import type { MouseEventHandler, ReactNode } from "react";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import styles from "./item.module.scss";

interface LoadingProps {
  label: string;
}

interface Props {
  label: string;
  children: ReactNode;
  right?: ReactNode;
  placeholder: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const Item: React.FC<Props> = ({ label, children, placeholder, right, disabled, onClick }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <button
        type="button"
        className={cx(styles.button, { [styles.placeholder]: !children })}
        onClick={onClick}
        disabled={disabled}
      >
        {children && children}
        {!children && placeholder}
        {right}
      </button>
    </div>
  );
};

export default Item;

export const LoadingItem: React.FC<LoadingProps> = ({ label }) => {
  return (
    <div className={styles.wrapper}>
      <span className={styles.label}>{label}</span>
      <Skeleton width="120px" containerClassName={styles.button} />
    </div>
  );
};
