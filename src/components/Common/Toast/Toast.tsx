"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { CSSTransition, TransitionGroup } from "react-transition-group";
import { useUnmount, useUpdateEffect } from "react-use";

import { TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION } from "@/common/constants/toast";

import ToastEventEmitter from "./ToastEventEmitter";
import {
  CallbackType,
  ChangeToastPositionType,
  toastAction,
  ToastItemInterface,
  ToastPositionInterface,
} from "./types";

import styles from "./toast.module.scss";

const toastRoot = document.querySelector("#toast") as HTMLDivElement;

const Toast = () => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timers = useRef<Record<string, NodeJS.Timer>>({});

  const [toasts, setToasts] = useState<ToastItemInterface[]>([]);
  const [position, setPosition] = useState<ChangeToastPositionType>(TOAST_BOTTOM_WITH_BOTTOM_NAVIGATION);

  const remove = useCallback((id: string) => {
    setToasts((prevState) => prevState.filter((notification) => notification.id !== id));
    delete timers.current?.[id];
  }, []);

  const addToast = useCallback(
    (toast: ToastItemInterface) => {
      setToasts((prevState) => [...prevState, toast]);
      timers.current[toast.id] = setTimeout(() => remove(toast.id), toast.autoCloseTime);
    },
    [remove],
  );

  const clear = useCallback(() => {
    setToasts([]);
    timers.current = {};
  }, []);

  const changePosition = useCallback((position: ToastPositionInterface) => {
    setPosition({ bottom: position.bottom });
  }, []);

  useEffect(() => {
    const eventCallback: CallbackType = (toast: any) => {
      if (toast.action === toastAction.ADD) {
        addToast(toast as ToastItemInterface);
      }
      if (toast.action === toastAction.REMOVE) {
        remove(toast.id);
      }
      if (toast.action === toastAction.CHANGE_POSITION) {
        changePosition(toast as ToastPositionInterface);
      }
      if (toast.action === toastAction.CLEAR) {
        clear();
      }
    };

    ToastEventEmitter.addChangeListener(eventCallback);
    return () => {
      ToastEventEmitter.removeChangeListener(eventCallback);
    };
  }, [addToast, changePosition, clear, remove]);

  useUpdateEffect(() => {
    wrapperRef.current?.scrollTo({
      behavior: "smooth",
      top: wrapperRef.current.scrollHeight,
    });
  }, [toasts]);

  useUnmount(() => {
    setToasts([]);
    Object.values(timers.current).forEach((timer) => {
      if (timer) {
        clearTimeout(timer);
      }
    });
  });

  return createPortal(
    <div className={styles.toastWrapper} ref={wrapperRef} style={{ bottom: position.bottom }}>
      <TransitionGroup className={styles.wrapper}>
        {toasts.map((toast) => (
          <CSSTransition
            key={toast.id}
            timeout={200}
            classNames={{
              enterDone: styles.enterDone,
              exitActive: styles.exitActive,
              exit: styles.exit,
            }}
            unmountOnExit
          >
            <div className={styles.toast}>
              <span>{toast.message}</span>
              {Boolean(toast.buttonText) && (
                <button type="button" className={styles.button} onClick={toast.onClickButton}>
                  {toast.buttonText}
                </button>
              )}
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>,
    toastRoot,
  );
};

export default Toast;
