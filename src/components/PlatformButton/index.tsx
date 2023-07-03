"use client";

import { type MouseEventHandler, type ReactNode, useCallback } from "react";

import { isMobile, isWebview } from "@/utils/userAgent";

interface Props {
  mobile: MouseEventHandler<HTMLButtonElement>;
  desktop: MouseEventHandler<HTMLButtonElement>;
  webview: MouseEventHandler<HTMLButtonElement>;
  children: ReactNode;
  className?: string;
}

const PlatformButton: React.FC<Props> = ({ desktop, mobile, webview, children, className }) => {
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (isWebview) webview(e);
      else if (isMobile) mobile(e);
      else desktop(e);
    },
    [desktop, mobile, webview],
  );

  return (
    <button type="button" className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default PlatformButton;
