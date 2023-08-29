import React, { type ComponentProps } from "react";

import cx from "clsx";

import styles from "./button.module.scss";

type Size = "small" | "medium";
type Color = "primary" | "secondary" | "bw";

interface Props extends ComponentProps<"button"> {
  color: Color;
  size?: Size;
  full?: boolean;
}

const Button: React.FC<Props> = ({ className, type, children, color, size = "medium", full = false, ...props }) => {
  return (
    <button
      type={type ?? "button"}
      className={cx(styles.wrapper, styles[color], styles[size], className, { [styles.full]: full })}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
