"use client";

import { type CSSProperties, useCallback, useState } from "react";

import cx from "clsx";

import type { ExhibitionDetail } from "@/common/types/exhibition";
import { WebScreenSharePayload } from "@/common/types/webview/screen";
import { BackButton, PlatformButton } from "@/components";
import { SpaceURLBottomSheet } from "@/components/BottomSheets/Space";
import { useHeaderScrollOpacity, useThrottleCallback, useWebview } from "@/hooks";
import sizes from "@/styles/constants/sizes.module.scss";
import { isClient } from "@/utils/next";
import { getNumberFromPixel } from "@/utils/styles";

import { IconBack, IconShare } from "public/icons";

import styles from "./header.module.scss";

interface Props {
  exhibition: ExhibitionDetail;
}

const Header: React.FC<Props> = ({ exhibition }) => {
  const [isShowURL, setIsShowURL] = useState(false);

  const { sendMessage } = useWebview();

  const { breakpoint, backgroundBreakpoint, opacity, backgroundOpacity } = useHeaderScrollOpacity({
    containerHeight: getNumberFromPixel(sizes.exhibitionThumbnailHeight),
    headerHeight: getNumberFromPixel(sizes.baseHeaderHeight),
  });

  const style = {
    "--opacity": opacity,
    "--background-opacity": backgroundOpacity,
    willChange: opacity !== 1 ? "opacity" : "auto",
  } as CSSProperties;

  const onClickShareWebview = useCallback(() => {
    sendMessage<WebScreenSharePayload>({
      type: "web-screen/share",
      data: {
        path: `/exhibitions/${exhibition.id}`,
        title: exhibition.title,
        description: exhibition.description,
        imageUrl: exhibition.thumbnail,
      },
    });
  }, [exhibition, sendMessage]);

  const onClickShareWebviewThrottle = useThrottleCallback(onClickShareWebview, 3_000);

  return (
    <>
      <header
        className={cx(styles.wrapper, {
          [styles.breakpoint]: breakpoint,
          [styles.backgroundBreakpoint]: backgroundBreakpoint,
        })}
        style={style}
      >
        <BackButton>
          <IconBack />
        </BackButton>
        {isClient && breakpoint && <p className={styles.title}>{exhibition.title}</p>}
        <PlatformButton
          desktop={() => setIsShowURL(true)}
          mobile={() => setIsShowURL(true)}
          webview={onClickShareWebviewThrottle}
        >
          <IconShare />
        </PlatformButton>
      </header>
      <SpaceURLBottomSheet isShow={isShowURL} onClose={() => setIsShowURL(false)} />
    </>
  );
};

export default Header;
