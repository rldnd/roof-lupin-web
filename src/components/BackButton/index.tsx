"use client";

import { type ComponentProps, memo, type MouseEventHandler, useCallback } from "react";

import { useRouter } from "next/navigation";

import { getBeforeNavigationUrl } from "@/utils/navigation";

interface Props extends ComponentProps<"button"> {}

const BackButton: React.FC<Props> = ({ className, onClick: onClickProps, ...props }) => {
  const { back, replace } = useRouter();

  const handleRoute = useCallback(() => {
    const beforeUrl = getBeforeNavigationUrl();
    if (!beforeUrl) replace("/");
    else back();
  }, [back, replace]);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    (e) => {
      onClickProps?.(e);
      handleRoute();
    },
    [onClickProps, handleRoute],
  );

  return <button className={className} onClick={onClick} {...props} />;
};

export default memo(BackButton);
