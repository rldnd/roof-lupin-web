"use client";

import { Button, Checkbox } from "@/components";

import styles from "./submit.module.scss";

interface Props {
  buttonText: string;
}

const Submit: React.FC<Props> = ({ buttonText }) => {
  return (
    <section className={styles.wrapper}>
      <Checkbox className={styles.total}>전체 동의</Checkbox>
      <Checkbox className={styles.checkbox}>개인정보 수집 동의</Checkbox>
      <Checkbox className={styles.checkbox}>개인정보 제 3자 제공 동의</Checkbox>
      <Checkbox className={styles.checkbox}>이용규칙 및 취소, 환불 규정 동의</Checkbox>
      <Button color="primary" full className={styles.submitButton}>
        {buttonText}
      </Button>
    </section>
  );
};

export default Submit;
