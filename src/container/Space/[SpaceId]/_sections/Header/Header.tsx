"use client";

import { type CSSProperties, useCallback, useEffect, useState } from "react";

import { useMutation, useQuery } from "@tanstack/react-query";
import cx from "clsx";

import type { SpaceDetail } from "@/common/types/space";
import { WebScreenSharePayload } from "@/common/types/webview/screen";
import { AuthChecker, BackButton, PlatformButton } from "@/components";
import { SpaceURLBottomSheet } from "@/components/BottomSheets/Space";
import { useDataToggle, useHeaderScrollOpacity, useWebview } from "@/hooks";
import { createSpaceInterestApi, deleteSpaceInterestApi, getSpaceInterestedApi } from "@/services/space";
import sizes from "@/styles/constants/sizes.module.scss";
import { isClient } from "@/utils/next";
import { getNumberFromPixel } from "@/utils/styles";

import { IconBack, IconBookmarkActive, IconBookmarkInactive, IconShare } from "public/icons";

import styles from "./header.module.scss";

interface Props {
  space: SpaceDetail;
}

const Header: React.FC<Props> = ({ space }) => {
  const [isShowURL, setIsShowURL] = useState(false);

  const { sendMessage } = useWebview();

  const [isActive, setIsActive] = useState(false);
  const { data: isInterested, refetch } = useQuery(
    ["getSpaceInterested", space.id],
    () => getSpaceInterestedApi(space.id).then((res) => res.data),
    {
      select: (res) => res.isInterested ?? false,
      useErrorBoundary: false,
    },
  );

  const { mutate: onCreate } = useMutation(createSpaceInterestApi, { onSuccess: () => refetch() });
  const { mutate: onDelete } = useMutation(deleteSpaceInterestApi, { onSuccess: () => refetch() });

  const handleClick = useDataToggle({
    id: space.id,
    isActiveData: isInterested,
    isActive,
    setIsActive,
    onCreate,
    onDelete,
  });

  const { breakpoint, backgroundBreakpoint, opacity, backgroundOpacity } = useHeaderScrollOpacity({
    containerHeight: getNumberFromPixel(sizes.spaceDetailCarouselHeight),
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
        path: `/spaces/${space.id}`,
        title: space.title,
        description: space.description,
        imageUrl: space.images?.[0].url,
      },
    });
  }, [sendMessage, space]);

  useEffect(() => {
    if (typeof isInterested === "boolean") setIsActive(isInterested);
  }, [isInterested]);

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
        {isClient && breakpoint && <p className={styles.title}>{space.title}</p>}
        <menu>
          <li>
            <PlatformButton
              desktop={() => setIsShowURL(true)}
              mobile={() => setIsShowURL(true)}
              webview={onClickShareWebview}
            >
              <IconShare />
            </PlatformButton>
          </li>
          <li>
            <AuthChecker afterLoginPath={`/spaces/${space.id}`}>
              <button type="button" onClick={handleClick} className={styles.bookmark}>
                {isActive && <IconBookmarkActive className={styles.active} />}
                {!isActive && <IconBookmarkInactive className={styles.inactive} />}
              </button>
            </AuthChecker>
          </li>
        </menu>
      </header>
      <SpaceURLBottomSheet isShow={isShowURL} onClose={() => setIsShowURL(false)} />
    </>
  );
};

export default Header;
