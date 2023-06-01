"use client";

import React, { MouseEventHandler } from "react";

import { Button } from "@/components/Common";
import { useGA } from "@/hooks";

const Form: React.FC = () => {
  const { gaEvent } = useGA();

  const onClickSocial: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { dataset } = e.currentTarget;
    gaEvent("login", {});
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/social/${dataset.social}`, "_self");
  };

  return (
    <section>
      <Button type="button" data-social="kakao" onClick={onClickSocial}>
        카카오 로그인
      </Button>
      <Button type="button" data-social="naver" onClick={onClickSocial}>
        네이버 로그인
      </Button>
    </section>
  );
};

export default Form;
