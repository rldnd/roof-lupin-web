"use client";

import { useIamport } from "@/hooks";
import { useMe } from "@/hooks/queries";
import { getPhoneNumberWithHyphen } from "@/utils/regex";

import { IconGrayRightChevronLargeThick } from "public/icons";

import Item from "./Item";

const PhoneNumber: React.FC = () => {
  const { me } = useMe();
  const { requestCertificate } = useIamport();

  return (
    <Item
      placeholder="010-0000-0000"
      label="전화번호"
      right={<IconGrayRightChevronLargeThick />}
      onClick={requestCertificate}
    >
      {me?.phoneNumber && getPhoneNumberWithHyphen(me?.phoneNumber)}
    </Item>
  );
};

export default PhoneNumber;
