"use client";

import React, { MouseEventHandler } from "react";

import { IconApple, IconKakao, IconNaver } from "public/icons";

import styles from "./form.module.scss";

const Form: React.FC = () => {
  const onClickSocial: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { dataset } = e.currentTarget;
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/social/${dataset.social}`, "_self");
  };

  return (
    <section className={styles.wrapper} aria-label="소셜 로그인 폼">
      <button type="button" onClick={onClickSocial} data-social="kakao" title="카카오 로그인">
        <IconKakao />
        카카오로 계속하기
      </button>
      <button type="button" onClick={onClickSocial} data-social="naver" title="네이버 로그인">
        <IconNaver />
        네이버로 계속하기
      </button>
      <button type="button" onClick={onClickSocial} data-social="apple" title="애플 로그인">
        <IconApple />
        Apple로 계속하기
      </button>
    </section>
  );
};

export default Form;
