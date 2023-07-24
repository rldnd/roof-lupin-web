"use client";

import { MouseEventHandler } from "react";

import cx from "clsx";

import { IconStepperMinus, IconStepperPlus } from "public/icons";

import styles from "./userStepper.module.scss";

interface Props {
  title: string;
  description?: string;
  value?: number;
  className?: string;
  onClickPlus: MouseEventHandler<HTMLButtonElement>;
  onClickMinus: MouseEventHandler<HTMLButtonElement>;
}

const UserStepper: React.FC<Props> = ({ title, description, onClickMinus, onClickPlus, value, className }) => {
  return (
    <section className={cx(styles.wrapper, className)} aria-label="인원 선택">
      <div className={styles.label}>
        <h2 className={styles.title}>{title}</h2>
        {description && <span className={styles.desc}>{description}</span>}
      </div>
      <div className={styles.stepper}>
        <button type="button" onClick={onClickMinus} aria-label="인원 제거">
          <IconStepperMinus />
        </button>
        <span className={styles.value}>{value}</span>
        <button type="button" onClick={onClickPlus} aria-label="인원 추가">
          <IconStepperPlus />
        </button>
      </div>
    </section>
  );
};

export default UserStepper;
