"use client";

import type { ChangeEventHandler, FormEventHandler } from "react";

import { useMutation } from "@tanstack/react-query";

import { Button, Radio } from "@/components";
import { createReviewReportApi } from "@/services/report";

import styles from "./form.module.scss";

const Form: React.FC = () => {
  const { mutate } = useMutation(createReviewReportApi, {});

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {};

  const onSubmit: FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault();
  };

  return (
    <form className={styles.wrapper}>
      <Radio>욕설/혐오/차별적 표현</Radio>
      <Radio>개인정보 포함 또는 유출 위험</Radio>
      <Radio>불쾌한 표현</Radio>
      <Radio>음란성 또는 청소년에게 유해한 내용</Radio>
      <Radio>사실과 다르거나 비방성 내용</Radio>
      <Radio>기타</Radio>
      <footer className={styles.footer}>
        <Button type="submit" color="primary" full>
          신고하기
        </Button>
      </footer>
    </form>
  );
};

export default Form;
