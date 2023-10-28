"use client";

import { type ComponentProps, memo, type MouseEventHandler, useCallback, useRef } from "react";

import { usePathname, useRouter } from "next/navigation";

import { getBeforeNavigationUrl } from "@/utils/navigation";

interface Props extends ComponentProps<"button"> {
  replaceUrl?: string;
  href?: string;
}

const BackButton: React.FC<Props> = ({ className, onClick: onClickProps, replaceUrl = "/", href, ...props }) => {
  const pathname = usePathname();
  const { back, replace } = useRouter();

  const tempPathname = useRef(pathname);

  const handleRoute = useCallback(() => {
    return new Promise<void>((res) => {
      if (href) {
        replace(href);
        res();
      }
      const beforeUrl = getBeforeNavigationUrl();
      if (!beforeUrl || beforeUrl === pathname) {
        replace(replaceUrl);
        res();
      } else {
        back();
        res();
      }
    });
  }, [back, href, pathname, replace, replaceUrl]);

  const onClick: MouseEventHandler<HTMLButtonElement> = useCallback(
    async (e) => {
      onClickProps?.(e);
      await handleRoute();
      if (window.location.pathname === tempPathname.current) replace(replaceUrl);
    },
    [onClickProps, handleRoute, replace, replaceUrl],
  );

  return <button className={className} onClick={onClick} aria-label="뒤로가기 버튼" {...props} />;
};

export default memo(BackButton);
