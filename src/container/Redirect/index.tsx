"use client";

import React from "react";

import { useRouter, useSearchParams } from "next/navigation";

import { useClientEffect } from "@/hooks";

// NOTE: 다이나믹 링크 컨트롤
const RedirectContainer: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useClientEffect(() => {
    const path = searchParams.get("redirect");
    if (!path) router.replace("/");
    else router.replace(path);
  }, [searchParams, router]);

  return null;
};

export default RedirectContainer;
