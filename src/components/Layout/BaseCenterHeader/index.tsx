import type { ReactNode } from "react";

import cx from "clsx";

import { BackButton } from "@/components";

import { IconBlackLeftChevronLarge } from "public/icons";

import styles from "./baseCenterHeader.module.scss";

interface Props {
  hasBorderBottom?: boolean;
  className?: string;
  title: ReactNode;
  replaceUrl?: string;
  href?: string;
}

const BaseCenterHeader: React.FC<Props> = ({ title, className, hasBorderBottom = false, replaceUrl, href }) => {
  return (
    <header className={cx(styles.wrapper, className, { [styles.hasBorderBottom]: hasBorderBottom })}>
      <BackButton className={styles.backButton} replaceUrl={replaceUrl} href={href}>
        <IconBlackLeftChevronLarge />
      </BackButton>
      <span className={styles.title}>{title}</span>
    </header>
  );
};

export default BaseCenterHeader;
