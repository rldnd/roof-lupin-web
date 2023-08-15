"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components";

import styles from "./moreButton.module.scss";

interface Props {
  count: number;
}

const MoreButton: React.FC<Props> = ({ count }) => {
  const { spaceId } = useParams();

  return (
    <Link href={`/spaces/${spaceId}/reviews`} className={styles.wrapper}>
      <Button type="button" color="secondary" full>
        {count}개 리뷰 더보기
      </Button>
    </Link>
  );
};

export default MoreButton;
