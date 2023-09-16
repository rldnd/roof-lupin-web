"use client";

import { type ComponentProps, memo, type MouseEventHandler, useCallback } from "react";

import { useRouter } from "next/navigation";

import { getBeforeNavigationUrl } from "@/utils/navigation";

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
    const beforeUrl = getBeforeNavigationUrl();
    if (!beforeUrl) replace(replaceUrl);
    else back();
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
