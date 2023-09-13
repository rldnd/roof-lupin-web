"use client";

import { GENDER_MAPPER } from "@/common/constants";
import { useMe } from "@/hooks/queries";

import { IconGrayRightChevronLargeThick } from "public/icons";

import Item from "./Item";

const Gender: React.FC = () => {
  const { me } = useMe();

  return (
    <Item label="성별" placeholder="성별" right={<IconGrayRightChevronLargeThick />}>
      {me?.gender && GENDER_MAPPER[me.gender]}
    </Item>
  );
};

export default Gender;
