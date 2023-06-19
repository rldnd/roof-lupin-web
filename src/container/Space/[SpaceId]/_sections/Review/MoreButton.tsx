"use client";

import { Button } from "@/components";

import styles from "./moreButton.module.scss";

interface Props {
  count: number;
}

const MoreButton: React.FC<Props> = ({ count }) => {
  return (
    <Button type="button" color="secondary" className={styles.wrapper}>
      {count}개 리뷰 더보기
    </Button>
  );
};

export default MoreButton;
