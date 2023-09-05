"use client";

import Link from "next/link";

import type { QnA } from "@/common/types/qna";

import { IconGrayRightChevronLarge } from "public/icons";

import styles from "./myQnaItem.module.scss";

interface Props {
  qna: QnA;
}

const MyQnaItem: React.FC<Props> = ({ qna }) => {
  return (
    <li>
      <div className={styles.titleWrapper}>
        <Link href={`/spaces/${qna.space.id}`} className={styles.spaceTitle}>
          {qna.space.title}
          <IconGrayRightChevronLarge />
        </Link>
      </div>
    </li>
  );
};

export default MyQnaItem;
