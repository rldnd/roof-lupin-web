"use client";

import type { ReactNode } from "react";

import cx from "clsx";
import ScrollContainer from "react-indiana-drag-scroll";

import styles from "./horizonDraggable.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
}

const HorizonDraggable: React.FC<Props> = ({ children, className }) => {
  return (
    <ScrollContainer className={cx(styles.wrapper, className)} component="ul">
      {children}
    </ScrollContainer>
  );
};

export default HorizonDraggable;
