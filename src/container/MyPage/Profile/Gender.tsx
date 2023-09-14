"use client";

import { useState } from "react";

import { GENDER_MAPPER } from "@/common/constants";
import { MyGenderBottomSheet } from "@/components/BottomSheets/MyPage";
import { useMe } from "@/hooks/queries";

import { IconGrayRightChevronLargeThick } from "public/icons";

import Item from "./Item";

const Gender: React.FC = () => {
  const { me } = useMe();

  const [isShowBottomSheet, setIsShowBottomSheet] = useState(false);

  return (
    <>
      <Item
        label="성별"
        placeholder="성별"
        right={<IconGrayRightChevronLargeThick />}
        onClick={() => setIsShowBottomSheet(true)}
      >
        {me?.gender && GENDER_MAPPER[me.gender]}
      </Item>
      <MyGenderBottomSheet isShow={isShowBottomSheet} onClose={() => setIsShowBottomSheet(false)} />
    </>
  );
};

export default Gender;
