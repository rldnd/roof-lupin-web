"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Loading } from "@/components";
import { usePopConfirm } from "@/hooks";
import { useMe } from "@/hooks/queries";

import { Item } from "../Menu";

const LogoutSection: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);

  const { replace } = useRouter();
  const { onLogout } = useMe();
  const { openPopConfirm } = usePopConfirm();

  const onClickLogout = () => {
    openPopConfirm({
      title: "로그아웃 하시겠어요?",
      description: "로그인하고 다양한 혜택 소식을 받아보세요!",
      onConfirm: () => {
        setIsLoading(true);
        replace("/");
        onLogout();
      },
    });
  };

  return (
    <>
      <Item onClick={onClickLogout}>로그아웃</Item>
      <Loading isShow={isLoading} />
    </>
  );
};

export default LogoutSection;
