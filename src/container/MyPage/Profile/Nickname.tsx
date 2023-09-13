"use client";

import { useMe } from "@/hooks/queries";

import { IconGrayRightChevronLargeThick } from "public/icons";

import Item from "./Item";

const Nickname: React.FC = () => {
  const { me } = useMe();

  return (
    <Item label="닉네임" placeholder="닉네임" right={<IconGrayRightChevronLargeThick />}>
      {me?.nickname}
    </Item>
  );
};

export default Nickname;
