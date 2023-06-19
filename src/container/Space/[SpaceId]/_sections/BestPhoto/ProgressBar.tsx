"use client";

import { useState } from "react";

import { useRafState } from "react-use";

import { useClientEffect } from "@/hooks";

import styles from "./progressBar.module.scss";

const ProgressBar: React.FC = () => {
  const [barWidthPercent, setBarWidthPercent] = useState(0);
  const [scrollLeft, setScrollLeft] = useRafState(0);

  useClientEffect(() => {
    const $list = document.getElementById("best-photo-section")!.querySelector("ul") as HTMLUListElement;

    const scrollHandler = () => {
      setScrollLeft(($list.scrollLeft / $list.scrollWidth) * 100);
    };

    const resizeHandler = () => {
      setBarWidthPercent(($list.offsetWidth / $list.scrollWidth) * 100);
    };

    resizeHandler();

    $list.addEventListener("scroll", scrollHandler);
    window.addEventListener("resize", resizeHandler);

    return () => {
      $list.removeEventListener("scroll", scrollHandler);
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return (
    <div className={styles.wrapper}>
      <div className={styles.progress} style={{ width: `${barWidthPercent}%`, left: `${scrollLeft}%` }} />
    </div>
  );
};

export default ProgressBar;
