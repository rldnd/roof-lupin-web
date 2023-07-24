"use client";

import type { ReactNode } from "react";

import { useClientEffect, useToast } from "@/hooks";

interface Props {
  position: { bottom: string };
  children: ReactNode;
}

const ToastPositioner: React.FC<Props> = ({ position, children }) => {
  const { changePosition } = useToast();

  useClientEffect(() => {
    changePosition({ ...position });
  }, [position]);

  return <>{children}</>;
};

export default ToastPositioner;
