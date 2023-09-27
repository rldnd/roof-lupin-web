"use client";

import cx from "clsx";

import styles from "./autoDeleteText.module.scss";

interface Props {
  className?: string;
}

const AutoDeleteText: React.FC<Props> = ({ className }) => {
  return <div className={cx(styles.wrapper, className)}>알림은 30일 후 자동 삭제됩니다.</div>;
};

export default AutoDeleteText;
