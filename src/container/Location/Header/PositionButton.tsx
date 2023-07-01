"use client";

import { IconPosition } from "public/icons";

import styles from "./positionButton.module.scss";

const PositionButton: React.FC = () => {
  return (
    <button type="button" className={styles.wrapper}>
      <IconPosition />
    </button>
  );
};

export default PositionButton;
