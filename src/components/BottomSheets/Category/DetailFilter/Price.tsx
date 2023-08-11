"use client";

import { Suspense, useState } from "react";

import styles from "./price.module.scss";

const Price: React.FC = () => {
  const [values, setValues] = useState([0, 40]);

  return (
    <section className={styles.wrapper}>
      <h2>가격</h2>
    </section>
  );
};

export default Price;
