"use client";

import { useState } from "react";

import { PlatformButton } from "@/components";
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
      <PlatformButton
        type="button"
        className={styles.call}
        mobile={() => setIsShowCall(true)}
        desktop={() => setIsShowCall(true)}
        webview={() => setIsShowCall(true)}
      >
        <IconPhone />
        문의하기
      </PlatformButton>
      <SpaceCallBottomSheet isShow={isShowCall} onClose={() => setIsShowCall(false)} phoneNumber={phoneNumber} />
    </>
  );
};

export default CallButton;
