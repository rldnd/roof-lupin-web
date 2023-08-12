"use client";

import React, { type MouseEventHandler, useState } from "react";

import type { Token } from "@/common/types/auth";
import type { WebAuthKakaoLoginPayload } from "@/common/types/webview/auth";
import { Button, Loading, PlatformButton } from "@/components";
import { usePlatform, useWebview } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { apiClient } from "@/services/apiClient";
import { setTokens } from "@/utils/auth";

import { IconApple, IconKakao, IconNaver } from "public/icons";

import styles from "./form.module.scss";

interface Props {
  close: () => void;
}

const Form: React.FC<Props> = ({ close }) => {
  const { refetchMe } = useMe();
  const { isIosWebview } = usePlatform();
  const [isLoading, setIsLoading] = useState(false);
  const { sendMessage } = useWebview();

  const onLoginKakaoWebview = () => {
    setIsLoading(true);
    sendMessage<WebAuthKakaoLoginPayload>({ type: "web-auth/kakaoLogin" });
  };

  const onClickSocial: MouseEventHandler<HTMLButtonElement> = (e) => {
    const { dataset } = e.currentTarget;
    window.open(`${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/social/${dataset.social}`, "_self");
  };

  const onClickTestLogin = async () => {
    setIsLoading(true);
    const { data } = await apiClient.get<Token>("/auth/test");
    setTokens(data);
    setIsLoading(false);
    refetchMe();
    close();
  };

  return (
    <>
      <section className={styles.wrapper} aria-label="소셜 로그인 폼">
        <PlatformButton
          type="button"
          desktop={onClickSocial}
          mobile={onClickSocial}
          webview={onLoginKakaoWebview}
          data-social="kakao"
          title="카카오 로그인"
        >
          <IconKakao />
          카카오로 계속하기
        </PlatformButton>
        <button type="button" onClick={onClickSocial} data-social="naver" title="네이버 로그인">
          <IconNaver />
          네이버로 계속하기
        </button>
        {isIosWebview && (
          <button type="button" onClick={onClickSocial} data-social="apple" title="애플 로그인">
            <IconApple />
            Apple로 계속하기
          </button>
        )}
        <Button type="button" color="primary" full onClick={onClickTestLogin}>
          테스트 로그인
        </Button>
      </section>
      <Loading isShow={isLoading} />
    </>
  );
};

export default Form;
