"use client";

import type { ElementType, ReactNode } from "react";

import cx from "clsx";
import ScrollContainer from "react-indiana-drag-scroll";

import styles from "./horizonDraggable.module.scss";

interface Props {
  className?: string;
  component?: ElementType;
  children: ReactNode;
}

const HorizonDraggable: React.FC<Props> = ({ children, className, component = "ul" }) => {
  return (
    <ScrollContainer vertical={false} className={cx(styles.wrapper, className)} component={component}>
      {children}
    </ScrollContainer>
  );
};

export default HorizonDraggable;
