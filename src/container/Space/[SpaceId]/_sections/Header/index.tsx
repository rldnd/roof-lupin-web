"use client";

import type { CSSProperties } from "react";

import cx from "clsx";

import type { SpaceDetail } from "@/common/types/space";
import { AuthChecker, BackButton, DataToggleButton } from "@/components";
import { useHeaderScrollOpacity } from "@/hooks";
import { createSpaceInterestApi, deleteSpaceInterestApi, getSpaceInterestedApi } from "@/services/space";
import sizes from "@/styles/constants/sizes.module.scss";
import { getNumberFromPixel } from "@/utils/styles";

import { IconBack, IconBookmarkActive, IconBookmarkInactive, IconShare } from "public/icons";

import styles from "./header.module.scss";

interface Props {
  space: SpaceDetail;
}

const Header: React.FC<Props> = ({ space }) => {
  const { breakpoint, backgroundBreakpoint, opacity, backgroundOpacity } = useHeaderScrollOpacity({
    containerHeight: getNumberFromPixel(sizes.spaceDetailCarouselHeight),
    headerHeight: getNumberFromPixel(sizes.mainHeaderHeight),
  });

  const style = {
    "--opacity": opacity,
    "--background-opacity": backgroundOpacity,
    willChange: opacity !== 1 ? "opacity" : "auto",
  } as CSSProperties;

  return (
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
      <p className={styles.title}>{space.title}</p>
      <menu>
        <li>
          <button type="button">
            <IconShare />
          </button>
        </li>
        <li>
          <AuthChecker>
            <DataToggleButton
              id={space.id}
              queryKey={["getSpaceInterested", space.id]}
              hasQueryFnIdArg
              dataKey={{ valueKey: "isInterested" }}
              queryFn={getSpaceInterestedApi}
              className={styles.bookmark}
              activeFn={createSpaceInterestApi}
              inactiveFn={deleteSpaceInterestApi}
            >
              <IconBookmarkActive />
              <IconBookmarkInactive />
            </DataToggleButton>
          </AuthChecker>
        </li>
      </menu>
    </header>
  );
};

export default Header;
