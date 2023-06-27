"use client";

import React, { useEffect } from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { setSocialType, setTokens } from "@/utils/auth";

const AppleContainer: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const status = searchParams.get("status");
    const accessToken = searchParams.get("accessToken");
    const refreshToken = searchParams.get("refreshToken");

    if (status === "200" && accessToken && refreshToken) {
      setTokens({ accessToken, refreshToken });
      setSocialType("apple");
      router.replace("/");
    } else router.back();
  }, [searchParams, router]);

  return null;
};

export default AppleContainer;
