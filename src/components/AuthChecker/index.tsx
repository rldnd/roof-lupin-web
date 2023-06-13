"use client";

import { type MouseEventHandler, type ReactNode, useCallback } from "react";

import { useMe } from "@/hooks/queries";

interface Props {
  className?: string;
  children: ReactNode;
}

const AuthChecker: React.FC<Props> = ({ className, children }) => {
  const { isLogined } = useMe();

  const onClickCapture: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!isLogined) {
        e.stopPropagation();
        // TODO: 로직 추가
        window.alert("로그인이 필요합니다.");
      }
    },
    [isLogined],
  );

  return (
    <div className={className} onClickCapture={onClickCapture}>
      {children}
    </div>
  );
};

export default AuthChecker;
