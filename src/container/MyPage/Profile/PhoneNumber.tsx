"use client";

import { useMe } from "@/hooks/queries";
import { getPhoneNumberWithHyphen } from "@/utils/regex";

import Item from "./Item";

const PhoneNumber: React.FC = () => {
  const { me } = useMe();

  return (
    <Item placeholder="010-0000-0000" label="전화번호">
      {me?.phoneNumber && getPhoneNumberWithHyphen(me?.phoneNumber)}
    </Item>
  );
};

export default PhoneNumber;
