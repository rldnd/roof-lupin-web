"use client";

import type { ReactNode } from "react";

import styles from "./section.module.scss";

interface Props {
  title?: string;
  children: ReactNode;
}

const Section: React.FC<Props> = ({ title, children }) => {
  return (
    <section className={styles.wrapper}>
      {title && <h2>{title}</h2>}
      {children}
    </section>
  );
};

export default Section;
