"use client";

import Skeleton from "react-loading-skeleton";

import type { FrequentQuestion } from "@/common/types/frequentQuestion";

import { IconGrayBottomChevronLarge } from "public/icons";

import styles from "./item.module.scss";

interface Props {
  frequentQuestion: FrequentQuestion;
}

const Item: React.FC<Props> = ({ frequentQuestion }) => {
  return (
    <details className={styles.wrapper}>
      <div className={styles.content} dangerouslySetInnerHTML={{ __html: frequentQuestion.answer }} />
      <summary className={styles.titleWrapper}>
        <strong className={styles.title}>{frequentQuestion.question}</strong>
        <div className={styles.chevronWrapper}>
          <IconGrayBottomChevronLarge />
        </div>
      </summary>
    </details>
  );
};

export default Item;

export const LoadingItem: React.FC = () => {
  return <Skeleton width="100%" height={96} />;
};
