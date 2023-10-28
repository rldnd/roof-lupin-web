"use client";

import { type ComponentProps, memo, type MouseEventHandler, useCallback } from "react";

import { useRouter } from "next/navigation";

import { HISTORY_STACK_URL } from "@/common/constants";
import { getHistoryStackUrl } from "@/utils/navigation";

interface Props extends ComponentProps<"button"> {
  replaceUrl?: string;
  href?: string;
}

const BackButton: React.FC<Props> = ({ className, onClick: onClickProps, replaceUrl = "/", href, ...props }) => {
  const { back, replace } = useRouter();

  const handleRoute = useCallback(() => {
    if (href) {
      replace(href);
      return;
    }

    const historyStackUrl = getHistoryStackUrl();
    if (historyStackUrl?.length === 1) {
      replace(replaceUrl);
      sessionStorage.setItem(HISTORY_STACK_URL, JSON.stringify([replaceUrl]));
    } else {
      back();
    }
  }, [back, href, replace, replaceUrl]);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      onClickProps?.(e);
      handleRoute();
    },
    [onClickProps, handleRoute],
  );

  return <button className={className} onClick={onClick} aria-label="뒤로가기 버튼" {...props} />;
};

export default memo(BackButton);
