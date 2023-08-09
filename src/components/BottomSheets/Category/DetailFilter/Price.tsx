"use client";

import { useState } from "react";

import { Slider } from "@/components";

import styles from "./price.module.scss";

const Price: React.FC = () => {
  const [values, setValues] = useState([0, 40]);

  return (
    <section className={styles.wrapper}>
      <h2>가격</h2>
      <Slider
        step={10}
        min={0}
        allowOverlap={false}
        max={40}
        values={values}
        onChange={setValues}
        renderTrack={({ props, children }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "6px",
              width: "100%",
              backgroundColor: "#ccc",
            }}
          >
            {children}
          </div>
        )}
        renderThumb={({ props }) => (
          <div
            {...props}
            style={{
              ...props.style,
              height: "42px",
              width: "42px",
              backgroundColor: "#999",
            }}
          />
        )}
      />
    </section>
  );
};

export default Price;
