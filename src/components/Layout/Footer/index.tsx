"use client";

import { type MouseEventHandler, useState } from "react";

import cx from "clsx";

import { URLS } from "@/common/constants/url";
import type { WebCommonOpenUrlPayload } from "@/common/types/webview/common";
import { usePlatform, useWebview } from "@/hooks";

import { IconFooterLogo, IconGrayBottomChevron } from "public/icons";

import styles from "./footer.module.scss";

interface Props {
  className?: string;
}

const Footer: React.FC<Props> = ({ className }) => {
  const { isWebview } = usePlatform();
  const { sendMessage } = useWebview();
  const [isOpen, setIsOpen] = useState(true);

  const onClickButton: MouseEventHandler<HTMLButtonElement> = (e) => {
    const url = e.currentTarget.dataset.url as string;
    if (isWebview) sendMessage<WebCommonOpenUrlPayload>({ type: "web-common/openUrl", data: { url } });
    else window.open(url, "_blank");
  };

  return (
    <footer className={cx(styles.wrapper, className)}>
      <div className={styles.title}>
        <IconFooterLogo />
        <button
          type="button"
          className={cx(styles.toggleButton, { [styles.isOpen]: isOpen })}
          onClick={() => setIsOpen((prev) => !prev)}
        >
          사업자 정보
          <IconGrayBottomChevron />
        </button>
      </div>
      <address className={cx({ [styles.isOpen]: isOpen })}>
        <p className={styles.row}>
          <span>쿠무코</span>
          <span>호스팅서비스 제공자 : 쿠무코</span>
          대표: 강동현
        </p>
        <p>사업자등록번호 : 383-26-01563</p>
        <p>통신판매업 : 2023-서울광진-1650</p>
        <p>주소 : 서울특별시 광진구 광나루로 436, 1층 101호</p>
        <p>대표 이메일 : contact@cumuco.net</p>
        <p>대표 연락처 : 070-8028-3628</p>
      </address>
      <nav className={styles.policies}>
        <button type="button">이용약관</button>
        <button type="button" data-url={URLS.privacy} onClick={onClickButton}>
          개인정보처리방침
        </button>
        <button type="button">운영정책</button>
      </nav>
      <p className={styles.bottomText}>
        쿠무코는 통신판매중개자로서, 상품의 예약, 이용 및 환불 등과 관련한 의무와 책임은 각 판매자에게 있습니다.
      </p>
    </footer>
  );
};

export default Footer;
