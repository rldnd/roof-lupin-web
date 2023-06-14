"use client";

import { memo, type ReactNode, useRef } from "react";
import { createPortal } from "react-dom";

import cx from "classnames";
import { CSSTransition } from "react-transition-group";

import Overlay from "../Overlay";

import styles from "./bottomSheetPortal.module.scss";

const bottomSheetRoot = document.querySelector("#bottom-sheet") as HTMLDivElement;

export interface Props {
  isShow: boolean;
  onClose?: () => void;
  className?: string;
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
  hideOverlay = false,
  isOverlayTransparent = false,
  shouldCloseOnOverlayClick = true,
}) => {
  const nodeRef = useRef(null);

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
