"use client";

import { Button } from "@/components";

import styles from "./submitButton.module.scss";

const Submit: React.FC = () => {
  return (
    <section className={styles.wrapper}>
      <Button color="primary" full className={styles.submitButton}>
        ~~원 결제 요청하기
      </Button>
    </section>
  );
};

export default Submit;
