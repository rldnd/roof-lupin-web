"use client";

import Link from "next/link";
import { useParams } from "next/navigation";

import { Button } from "@/components";

import styles from "./totalButton.module.scss";

interface Props {
  isEmpty: boolean;
}

const TotalButton: React.FC<Props> = ({ isEmpty }) => {
  const { spaceId } = useParams();

  if (isEmpty)
    return (
      <Button type="button" color="secondary" disabled className={styles.wrapper}>
        포토 리뷰 전체보기
      </Button>
    );

  return (
    <Link href={`/spaces/${spaceId}/reviews?hasPhoto=true`} className={styles.wrapper}>
      <Button type="button" color="secondary" full>
        포토 리뷰 전체보기
      </Button>
    </Link>
  );
};

export default TotalButton;
