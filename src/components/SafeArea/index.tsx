"use client";

import { type ReactNode, useLayoutEffect } from "react";

import type {
  StatusBarTheme,
  WebScreenSafeAreaPayload,
  WebScreenStatusBarThemePayload,
} from "@/common/types/webview/screen";
import { useWebview } from "@/hooks";

interface Props {
  top?: boolean;
  bottom?: boolean;
  theme?: StatusBarTheme;
  children: ReactNode;
}

const SafeArea: React.FC<Props> = ({ children, top = false, bottom = false, theme }) => {
  const { sendMessage } = useWebview();

  useLayoutEffect(() => {
    sendMessage<WebScreenSafeAreaPayload>({
      type: "web-screen/safeArea",
      data: { hasTopSafeArea: top, hasBottomSafeArea: bottom },
    });

    if (theme) {
      sendMessage<WebScreenStatusBarThemePayload>({
        type: "web-screen/statusBarTheme",
        data: { theme },
      });
    }
  }, [bottom, sendMessage, theme, top]);

  return <>{children}</>;
};

export default SafeArea;
