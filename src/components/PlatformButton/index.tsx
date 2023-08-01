"use client";

import { ComponentProps, type MouseEventHandler, useCallback } from "react";

import { usePlatform } from "@/hooks";

interface Props extends Omit<ComponentProps<"button">, "onClick"> {
  mobile: MouseEventHandler<HTMLButtonElement>;
  desktop: MouseEventHandler<HTMLButtonElement>;
  webview: MouseEventHandler<HTMLButtonElement>;
}

const PlatformButton: React.FC<Props> = ({ desktop, mobile, webview, children, ...props }) => {
  const { isWebview, isMobile } = usePlatform();
  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      if (isWebview) webview(e);
      else if (isMobile) mobile(e);
      else desktop(e);
    },
    [desktop, isMobile, isWebview, mobile, webview],
  );

  return (
    <button type="button" onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default PlatformButton;
