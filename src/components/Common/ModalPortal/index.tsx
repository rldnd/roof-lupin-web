"use client";

import { memo, MouseEventHandler, type ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

import cx from "clsx";
import { CSSTransition } from "react-transition-group";

import Overlay from "../Overlay";

import styles from "./modalPortal.module.scss";

const modalRoot = document.querySelector("#modal") as HTMLDivElement;

export interface Props {
  isShow: boolean;
  onClose?: MouseEventHandler<HTMLDivElement>;
  className?: string;
  wrapperClassName?: string;
  hideOverlay?: boolean;
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
  hideOverlay = false,
  isOverlayTransparent = false,
  shouldCloseOnOverlayClick = false,
}) => {
  const nodeRef = useRef(null);

  return createPortal(
    <CSSTransition
      in={isShow}
      timeout={100}
      classNames={{
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
        <aside className={cx(styles.modal, className)}>{children}</aside>
      </div>
    </CSSTransition>,
    modalRoot,
  );
};

export default memo(ModalPortal);
