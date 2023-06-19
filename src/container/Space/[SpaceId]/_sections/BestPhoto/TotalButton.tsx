"use client";

import { Button } from "@/components";

import styles from "./totalButton.module.scss";

const TotalButton: React.FC = () => {
  return (
    <Button type="button" color="secondary" className={styles.wrapper}>
      포토 리뷰 전체보기
    </Button>
  );
};

export default TotalButton;
