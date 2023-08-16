"use client";

import { type ReactNode, useRef } from "react";

import cx from "clsx";
import { useWindowSize } from "react-use";

import { useClientEffect } from "@/hooks";

import styles from "./heightFitLayout.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
}

/** height가 딱 100% 가 되어야 하는 경우일 때 사용 */
const HeightFitLayout: React.FC<Props> = ({ children, className }) => {
  const layoutRef = useRef<HTMLDivElement>(null);
  const { height } = useWindowSize();

  useClientEffect(() => {
    if (CSS.supports("height: 100dvh")) return;
    if (layoutRef.current) layoutRef.current.style.height = `${height}px`;
  }, [height]);

  return <div className={cx(styles.wrapper, className)}>{children}</div>;
};

export default HeightFitLayout;
