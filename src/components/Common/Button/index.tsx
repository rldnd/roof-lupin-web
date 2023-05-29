import React, { type ComponentProps } from "react";

import cx from "clsx";

import styles from "./button.module.scss";

interface Props extends ComponentProps<"button"> {}

const Button: React.FC<Props> = ({ className, type, children, ...props }) => {
  return (
    <button type={type ?? "button"} className={cx(styles.wrapper, className)} {...props}>
      {children}
    </button>
  );
};

export default Button;
