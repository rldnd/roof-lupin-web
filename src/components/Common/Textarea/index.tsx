"use client";

import type { ComponentProps } from "react";

import cx from "clsx";

import styles from "./textarea.module.scss";

interface Props extends ComponentProps<"textarea"> {
  outlined?: boolean;
}

const Textarea: React.FC<Props> = ({ className, outlined, ...props }) => {
  return <textarea className={cx(styles.wrapper, className, { [styles.outlined]: outlined })} {...props} />;
};

export default Textarea;
