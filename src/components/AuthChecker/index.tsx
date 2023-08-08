"use client";

import { type MouseEventHandler, type ReactNode, useCallback } from "react";

import { useRouter } from "next/navigation";

import { useToast } from "@/hooks";
import { useMe } from "@/hooks/queries";

interface Props {
  className?: string;
  children: ReactNode;
}

const AuthChecker: React.FC<Props> = ({ className, children }) => {
  const { isLogined } = useMe();
  const { addToast } = useToast();
  const { push } = useRouter();

  const onClickCapture: MouseEventHandler<HTMLDivElement> = useCallback(
    (e) => {
      if (!isLogined) {
        e.stopPropagation();
        addToast({ message: "로그인이 필요합니다." });
        push("/auth/login");
      }
    },
    [addToast, isLogined, push],
  );

  return (
    <div className={className} onClickCapture={onClickCapture}>
      {children}
    </div>
  );
};

export default AuthChecker;
