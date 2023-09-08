"use client";

import { range } from "lodash-es";

import { IconStarEmptyLarge, IconStarLarge } from "public/icons";

import styles from "./starRatingMenu.module.scss";

interface Props {
  score: number;
  onClick(score: number): void;
}

const StarRatingMenu: React.FC<Props> = ({ score, onClick }) => {
  return (
    <menu className={styles.wrapper}>
      {range(1, 6).map((value) => (
        <li key={value} className={styles.item}>
          <button type="button" className={styles.button} onClick={() => onClick(value)}>
            {score < value ? <IconStarEmptyLarge /> : <IconStarLarge />}
          </button>
        </li>
      ))}
    </menu>
  );
};

export default StarRatingMenu;
