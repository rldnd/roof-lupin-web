"use client";

import { memo, useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CSSTransition } from "react-transition-group";

import type { PopConfirmCallbackType, PopConfirmOpenInterface } from "./types";

import PopConfirmEventEmitter from "./PopConfirmEventEmitter";
import Overlay from "../Overlay";

import styles from "./popConfirm.module.scss";

const popConfirmRoot = document.querySelector("#pop-confirm") as HTMLDivElement;

const PopConfirm: React.FC = () => {
  const nodeRef = useRef(null);
  const [isShow, setIsShow] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const onConfirm = useRef<() => void>();
  const onCancel = useRef<() => void>();

  const close = useCallback(() => {
    setIsShow(false);
    setTitle("");
    setDescription("");
    onConfirm.current = undefined;
    onCancel.current = undefined;
  }, []);

  const open = useCallback(
    (args: PopConfirmOpenInterface) => {
      setIsShow(true);
      setTitle(args.title);
      if (args.description) setDescription(args.description);
      onConfirm.current = () => {
        args.onConfirm();
        close();
      };
      onCancel.current = () => {
        args.onCancel?.();
        close();
      };
    },
    [close],
  );

  useEffect(() => {
    const eventCallback: PopConfirmCallbackType = (event) => {
      if (event.action === "open") open(event);
      if (event.action === "close") close();
    };

    PopConfirmEventEmitter.addChangeListener(eventCallback);
    return () => {
      PopConfirmEventEmitter.removeChangeListener(eventCallback);
    };
  }, [close, open]);

  if (!popConfirmRoot) return null;

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
      <div className={styles.wrapper} ref={nodeRef}>
        <Overlay onClose={onCancel.current} isOverlayTransparent={false} />
        <aside className={styles.popConfirm}>
          {title}
          {description}
          <button type="button" onClick={onCancel.current}>
            취소
          </button>
          <button type="button" onClick={onConfirm.current}>
            확인
          </button>
        </aside>
      </div>
    </CSSTransition>,
    popConfirmRoot,
  );
};

export default memo(PopConfirm);
