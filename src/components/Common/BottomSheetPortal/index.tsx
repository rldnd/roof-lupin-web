"use client";

import { memo, type MouseEventHandler, type ReactNode, useEffect, useRef } from "react";
import { createPortal } from "react-dom";

import cx from "classnames";
import { CSSTransition } from "react-transition-group";

import { useScrollBlock } from "@/hooks";
import { isClient } from "@/utils/next";

import Overlay from "../Overlay";

import styles from "./bottomSheetPortal.module.scss";

const bottomSheetRoot = document.querySelector("#bottom-sheet") as HTMLDivElement;

export interface Props {
  isShow: boolean;
  onClose?: MouseEventHandler<HTMLDivElement>;
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
  const { block, unBlock } = useScrollBlock();

  useEffect(() => {
    if (!blockWindowScroll || !isClient) return;

    if (isShow) block();
    if (!isShow) unBlock();
  }, [isShow, blockWindowScroll, block, unBlock]);

  return createPortal(
    <CSSTransition
      in={isShow}
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
