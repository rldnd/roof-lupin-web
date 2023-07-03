"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useClientEffect } from "@/hooks";
import { isWebview } from "@/utils/userAgent";

// NOTE: 다이나믹 링크 컨트롤
const RedirectContainer: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useClientEffect(() => {
    const path = searchParams.get("redirect");
    if (!isWebview || !path) router.replace("/");
    router.replace(path!);
  }, [searchParams, router]);

  return null;
};

export default RedirectContainer;
