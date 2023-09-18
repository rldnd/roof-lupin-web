"use client";

import { useState } from "react";

import { SpaceCallBottomSheet } from "@/components/BottomSheets/Space";

import { IconPhone } from "public/icons";

import styles from "./callButton.module.scss";

interface Props {
  phoneNumber: string;
}

const CallButton: React.FC<Props> = ({ phoneNumber }) => {
  const [isShowCall, setIsShowCall] = useState(false);

  return (
    <>
      <button type="button" className={styles.call} onClick={() => setIsShowCall(true)}>
        <IconPhone />
        문의하기
      </button>
      <SpaceCallBottomSheet isShow={isShowCall} onClose={() => setIsShowCall(false)} phoneNumber={phoneNumber} />
    </>
  );
};

export default CallButton;
