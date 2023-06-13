import type { ComponentProps } from "react";

import Link from "next/link";

import cx from "clsx";

import { IconGrayRightChevron } from "public/icons";

import styles from "./arrowLink.module.scss";

interface Props extends ComponentProps<typeof Link> {}

const ArrowLink: React.FC<Props> = ({ children, className, ...props }) => {
  return (
    <Link className={cx(styles.wrapper, className)} {...props}>
      {children}
      <IconGrayRightChevron />
    </Link>
  );
};

export default ArrowLink;
