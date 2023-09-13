"use client";

import { useState } from "react";

import { MyBirthBottomSheet } from "@/components/BottomSheets/MyPage";
import { useMe } from "@/hooks/queries";
import { getBirthDay, getBirthYearTwoDigits } from "@/utils/time";

import { IconGrayRightChevronLargeThick } from "public/icons";

import Item from "./Item";

const Birth: React.FC = () => {
  const { me } = useMe();

  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  if (!me) return null;

  const { birthYear, birthDay } = me;
  const birth =
    birthYear && birthDay
      ? `${getBirthYearTwoDigits(birthYear)}.${getBirthDay(birthDay)?.month}.${getBirthDay(birthDay)?.day}`
      : "";

  return (
    <>
      <Item
        label="생년월일"
        placeholder="YY.MM.DD"
        right={<IconGrayRightChevronLargeThick />}
        onClick={() => setIsShowBottomSheet(true)}
      >
        {birth}
      </Item>
      <MyBirthBottomSheet isShow={isShowBottomSheet} onClose={() => setIsShowBottomSheet(false)} />
    </>
  );
};

export default Birth;
