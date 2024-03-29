"use client";

import { useIamport } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getBirthYearTwoDigits } from "@/utils/time";

import { IconGrayRightChevronLargeThick } from "public/icons";

import Item from "./Item";

const Birth: React.FC = () => {
  const { me } = useMe();
  const { requestCertificate } = useIamport();

  if (!me) return null;

  const { birthYear, birthMonth, birthDay } = me;
  const birth =
    birthYear && birthMonth && birthDay ? `${getBirthYearTwoDigits(birthYear)}.${birthMonth}.${birthDay}` : "";

  return (
    <Item
      label="생년월일"
      placeholder="YY.MM.DD"
      right={<IconGrayRightChevronLargeThick />}
      onClick={requestCertificate}
    >
      {birth}
    </Item>
  );
};

export default Birth;
