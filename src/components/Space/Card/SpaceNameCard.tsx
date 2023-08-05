"use client";

import { memo } from "react";

import Link from "next/link";

import cx from "clsx";
import Skeleton from "react-loading-skeleton";

import type { Space } from "@/common/types/space";

import styles from "./spaceNameCard.module.scss";

interface Props {
  className?: string;
  space: Space;
  href: string;
}

const SpaceNameCard: React.FC<Props> = ({ space, href, className }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <Link href={href}>
        <img src={space.thumbnail} alt="공간 이미지" className={styles.image} />
        {space.publicTransportations.length > 0 && (
          <small className={styles.transport}>{space.publicTransportations[0].name}</small>
        )}
        <span className={styles.name}>{space.title}</span>
      </Link>
    </li>
  );
};

export default memo(SpaceNameCard);

export const LoadingSpaceNameCard: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <li className={cx(styles.wrapper, className)}>
      <Skeleton className={styles.image} />
      <Skeleton className={styles.transport} width={50} />
      <Skeleton className={styles.name} width={100} />
    </li>
  );
};
