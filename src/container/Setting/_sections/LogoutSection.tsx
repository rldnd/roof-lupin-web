"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { Loading } from "@/components";
import { usePopConfirm } from "@/hooks";
import { useMe } from "@/hooks/queries";

import ButtonItem from "../ButtonItem";
import Section from "../Section";

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
        onLogout();
        replace("/");
      },
    });
  };

  return (
    <>
      <Section>
        <ButtonItem onClick={onClickLogout}>로그아웃</ButtonItem>
      </Section>
      <Loading isShow={isLoading} />
    </>
  );
};

export default LogoutSection;
