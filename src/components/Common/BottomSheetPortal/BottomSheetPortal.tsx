"use client";

import { memo, type MouseEventHandler, type ReactNode, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import cx from "classnames";
import { CSSTransition } from "react-transition-group";
import { useUnmount } from "react-use";

import { useClientEffect, useScrollBlock } from "@/hooks";

import Overlay from "../Overlay";

import styles from "./bottomSheetPortal.module.scss";

const bottomSheetRoot = document.querySelector("#bottom-sheet") as HTMLDivElement;

export interface Props {
  isShow: boolean;
  onClose?: MouseEventHandler<HTMLElement>;
  className?: string;
  blockWindowScroll?: boolean;
  wrapperClassName?: string;
  hideOverlay?: boolean;
  shouldCloseOnOverlayClick?: boolean;
  isOverlayTransparent?: boolean;
  children: ReactNode;
}

const BottomSheetPortal: React.FC<Props> = ({
  isShow,
  onClose,
  wrapperClassName,
  className,
  children,
  blockWindowScroll = false,
  hideOverlay = false,
  isOverlayTransparent = false,
  shouldCloseOnOverlayClick = true,
}) => {
  const nodeRef = useRef(null);
  const [innerOpen, setInnerOpen] = useState(false);
  const { block, unBlock } = useScrollBlock();

  useClientEffect(() => {
    if (!blockWindowScroll) return;

    if (isShow) block();
    if (!isShow) unBlock();
  }, [isShow, blockWindowScroll, block, unBlock]);

  useUnmount(() => {
    unBlock();
  });

  useEffect(() => {
    if (isShow) setInnerOpen(true);
    else setTimeout(() => setInnerOpen(false), 200);
  }, [isShow]);

  if (!bottomSheetRoot) return null;

  return createPortal(
    <CSSTransition
      in={innerOpen}
      timeout={200}
      classNames={{
        enter: styles.enter,
        enterDone: styles.enterDone,
        exitActive: styles.exitActive,
        exit: styles.exit,
      }}
      nodeRef={nodeRef}
      unmountOnExit
    >
      <div className={cx(styles.wrapper, wrapperClassName)} ref={nodeRef}>
        {!hideOverlay && (
          <Overlay
            onClose={shouldCloseOnOverlayClick ? onClose : undefined}
            isOverlayTransparent={isOverlayTransparent}
          />
        )}
        <aside className={cx(styles.bottomSheet, className)}>{children}</aside>
      </div>
    </CSSTransition>,
    bottomSheetRoot,
  );
};

export default memo(BottomSheetPortal);
