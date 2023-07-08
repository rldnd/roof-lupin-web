"use client";

import { useState } from "react";

import cx from "clsx";

import { IconFooterLogo, IconGrayBottomChevron } from "public/icons";

import styles from "./footer.module.scss";

const Footer: React.FC = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <footer className={styles.wrapper}>
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
        <p>주소 : 서울특별시 광진구 광나루로 436, 1층 101호</p>
        <p>대표 이메일 : contact@cumuco.net</p>
      </address>
    </footer>
  );
};

export default Footer;
