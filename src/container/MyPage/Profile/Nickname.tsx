"use client";

import { useState } from "react";

import { MyNicknameBottomSheet } from "@/components/BottomSheets/MyPage";
import { useMe } from "@/hooks/queries";

import { IconGrayRightChevronLargeThick } from "public/icons";

import Item from "./Item";

const Nickname: React.FC = () => {
  const { me } = useMe();

  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  return (
    <>
      <Item
        label="닉네임"
        placeholder="닉네임"
        right={<IconGrayRightChevronLargeThick />}
        onClick={() => setIsShowBottomSheet(true)}
      >
        {me?.nickname}
      </Item>
      <MyNicknameBottomSheet isShow={isShowBottomSheet} onClose={() => setIsShowBottomSheet(false)} />
    </>
  );
};

export default Nickname;
