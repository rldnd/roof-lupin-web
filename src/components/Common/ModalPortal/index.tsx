"use client";

import { memo, MouseEventHandler, type ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

import cx from "clsx";
import { CSSTransition } from "react-transition-group";
import { useUnmount } from "react-use";

import { useClientEffect, useScrollBlock } from "@/hooks";

import Overlay from "../Overlay";

import styles from "./modalPortal.module.scss";

const modalRoot = document.querySelector("#modal") as HTMLDivElement;

export interface Props {
  isShow: boolean;
  onClose?: MouseEventHandler<HTMLDivElement>;
  className?: string;
  wrapperClassName?: string;
  hideOverlay?: boolean;
  blockWindowScroll?: boolean;
  overlayClassName?: string;
  shouldCloseOnOverlayClick?: boolean;
  isOverlayTransparent?: boolean;
  children: ReactNode;
}

const ModalPortal: React.FC<Props> = ({
  isShow,
  onClose,
  wrapperClassName,
  className,
  children,
  overlayClassName,
  blockWindowScroll = false,
  hideOverlay = false,
  isOverlayTransparent = false,
  shouldCloseOnOverlayClick = true,
}) => {
  const nodeRef = useRef(null);
  const { block, unBlock } = useScrollBlock();

  useClientEffect(() => {
    if (!blockWindowScroll) return;

    if (isShow) block();
    if (!isShow) unBlock();
  }, [isShow, blockWindowScroll, block, unBlock]);

  useUnmount(() => {
    unBlock();
  });

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
            className={overlayClassName}
            onClose={shouldCloseOnOverlayClick ? onClose : undefined}
            isOverlayTransparent={isOverlayTransparent}
          />
        )}
        <aside className={cx(styles.modal, className)}>{children}</aside>
      </div>
    </CSSTransition>,
    modalRoot,
  );
};

export default memo(ModalPortal);
