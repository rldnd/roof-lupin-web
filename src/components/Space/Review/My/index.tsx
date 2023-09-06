"use client";

import { memo } from "react";

import Link from "next/link";

import cx from "clsx";

import type { Review } from "@/common/types/review";

import styles from "./mySpaceReview.module.scss";

interface Props {
  review: Review;
  className?: string;
}

const MySpaceReview: React.FC<Props> = ({ review, className }) => {
  return (
    <>
      <li className={cx(styles.wrapper, className)}>
        <div className={styles.titleWrapper}>{/* <Link className={styles.spaceTitle} href={}></Link> */}</div>
      </li>
    </>
  );
};

export default memo(MySpaceReview);
