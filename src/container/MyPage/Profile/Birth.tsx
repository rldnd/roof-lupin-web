"use client";

import { useMe } from "@/hooks/queries";
import { getBirthDay, getBirthYearTwoDigits } from "@/utils/time";

import { IconGrayRightChevronLargeThick } from "public/icons";

import Item from "./Item";

const Birth: React.FC = () => {
  const { me } = useMe();

  if (!me) return null;

  const { birthYear, birthDay } = me;
  const birth =
    birthYear && birthDay
      ? `${getBirthYearTwoDigits(birthYear)}.${getBirthDay(birthDay)?.month}.${getBirthDay(birthDay)?.day}`
      : "";

  return (
    <Item label="생년월일" placeholder="YY.MM.DD" right={<IconGrayRightChevronLargeThick />}>
      {birth}
    </Item>
  );
};

export default Birth;
