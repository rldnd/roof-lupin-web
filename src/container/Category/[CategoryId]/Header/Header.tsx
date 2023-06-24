"use client";

import { memo, useCallback } from "react";

import { useRouter } from "next/navigation";

import { BaseHeader } from "@/components/Layout";

import { IconGrayHome } from "public/icons";

const Header: React.FC = () => {
  const { replace } = useRouter();

  const onClickHome = useCallback(() => {
    replace("/");
  }, [replace]);

  return (
    <BaseHeader
      title="카테고리"
      right={
        <button type="button" title="홈으로 돌아가기" onClick={onClickHome}>
          <IconGrayHome />
        </button>
      }
    />
  );
};

export default memo(Header);
