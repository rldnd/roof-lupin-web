"use client";

import { useId } from "react";

import { Checkbox } from "../Common";

import styles from "./menuItem.module.scss";

interface Props {
  checked: boolean;
  disabled: boolean;
}

const MenuItem: React.FC<Props> = ({ checked, disabled }) => {
  const id = useId();

  return (
    <button type="button" aria-describedby={id} className={styles.wrapper}>
      <label htmlFor={id}>
        <Checkbox aria-describedby={id} checked={checked} disabled={disabled} />
      </label>
    </button>
  );
};

export default MenuItem;
