"use client";

import { useRouter } from "next/navigation";

import type { AppAuthKakaoLoginPayload } from "@/common/types/webview/auth";
import { useClientEffect, useWebview } from "@/hooks";
import { setSocialType, setTokens } from "@/utils/auth";

const AppSocialLoginHandler: React.FC = () => {
  const { replace } = useRouter();
  const { addListener, removeListener } = useWebview();

  useClientEffect(() => {
    addListener<AppAuthKakaoLoginPayload>("app-auth/kakaoLogin", (tokens) => {
      setTokens(tokens);
      setSocialType("kakao");
      replace("/");
    });

    return () => {
      removeListener<AppAuthKakaoLoginPayload>("app-auth/kakaoLogin");
    };
  }, [addListener, replace, removeListener]);

  return null;
};

export default AppSocialLoginHandler;
