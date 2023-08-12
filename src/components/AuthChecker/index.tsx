"use client";

import { type MouseEventHandler, type ReactNode, useCallback } from "react";

import { useLoginSheet } from "@/hooks";
import { useMe } from "@/hooks/queries";

interface Props {
  className?: string;
  children: ReactNode;
}

const AuthChecker: React.FC<Props> = ({ className, children }) => {
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

  return (
    <div className={className} onClickCapture={onClickCapture}>
      {children}
    </div>
  );
};

export default AuthChecker;
