"use client";

import React, { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { Loading } from "@/components";
import { setSocialType, setTokens } from "@/utils/auth";

const NaverContainer: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (status === "200" && accessToken && refreshToken) {
      setTokens({ accessToken, refreshToken });
      setSocialType("naver");
      router.replace("/");
    } else router.back();
  }, [searchParams, router]);

  return <Loading isShow />;
};

export default NaverContainer;
