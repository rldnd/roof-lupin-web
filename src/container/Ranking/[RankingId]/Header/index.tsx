"use client";

import { useRouter } from "next/navigation";

import { BaseHeader } from "@/components/Layout";

import { IconGrayHome } from "public/icons";

interface Props {
  title: string;
}

const Header: React.FC<Props> = ({ title }) => {
  const { replace } = useRouter();

  const onClickHome = () => {
    replace("/");
  };

  return (
    <BaseHeader
      title={title}
      right={
        <button type="button" onClick={onClickHome}>
          <IconGrayHome />
        </button>
      }
    />
  );
};

export default Header;
