"use client";

import { type MouseEventHandler, type ReactNode, useCallback } from "react";

import { AFTER_LOGIN_REDIRECT_PATH } from "@/common/constants";
import { useClientEffect, useLoginSheet } from "@/hooks";
import { useMe } from "@/hooks/queries";

interface Props {
  className?: string;
  children: ReactNode;
  afterLoginPath: string;
}

const AuthChecker: React.FC<Props> = ({ className, children, afterLoginPath }) => {
  const { openSheet } = useLoginSheet();
  const { isLogined } = useMe();

  const onClickCapture: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!isLogined) {
        e.stopPropagation();
        openSheet();
      }
    },
    [isLogined, openSheet],
  );

  useClientEffect(() => {
    sessionStorage.setItem(AFTER_LOGIN_REDIRECT_PATH, afterLoginPath);
  }, [afterLoginPath]);

  return (
    <div className={className} onClickCapture={onClickCapture}>
      {children}
    </div>
  );
};

export default AuthChecker;
