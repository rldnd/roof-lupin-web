"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { AFTER_LOGIN_REDIRECT_PATH } from "@/common/constants";
import { useClientEffect } from "@/hooks";
import { setSocialType, setTokens } from "@/utils/auth";

const DataHandler: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useClientEffect(() => {
    const status = searchParams.get("status");
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (status === "200" && accessToken && refreshToken) {
      setTokens({ accessToken, refreshToken });
      setSocialType("kakao");
      router.replace(sessionStorage.getItem(AFTER_LOGIN_REDIRECT_PATH) ?? "/");
    } else router.replace("/auth/failed");
  }, [searchParams, router]);

  return null;
};

export default DataHandler;
