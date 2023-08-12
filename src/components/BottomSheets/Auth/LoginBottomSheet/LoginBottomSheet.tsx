"use client";

import { useCallback, useEffect, useState } from "react";

import { BottomSheetPortal } from "@/components/Common";

import Form from "./Form";
import LoginBottomSheetEventEmitter from "./LoginBottomSheetEventEmitter";
import { BottomSheetCallbackType } from "./types";

import styles from "./loginBottomSheet.module.scss";

const LoginBottomSheet: React.FC = () => {
  const [isShow, setIsShow] = useState(false);

  const open = useCallback(() => {
    setIsShow(true);
  }, []);

  const close = useCallback(() => {
    setIsShow(false);
  }, []);

  useEffect(() => {
    const eventCallback: BottomSheetCallbackType = ({ action }) => {
      if (action === "open") open();
      if (action === "close") close();
    };

    LoginBottomSheetEventEmitter.addChangeListener(eventCallback);

    return () => {
      LoginBottomSheetEventEmitter.removeChangeListener(eventCallback);
    };
  }, [close, open]);

  return (
    <BottomSheetPortal className={styles.wrapper} isShow={isShow} onClose={close} blockWindowScroll>
      <img
        src="/images/auth/login-bottom-sheet-logo.png"
        alt="루프루팡 로고"
        width={87}
        height={110}
        className={styles.logo}
      />
      <span className={styles.desc}>지금 가입하고 루프라이프를 시작해보세요</span>
      <Form close={close} />
      <button type="button" className={styles.closeButton} onClick={close}>
        둘러보기
      </button>
    </BottomSheetPortal>
  );
};

export default LoginBottomSheet;
