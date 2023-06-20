"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components";

import styles from "./moreButton.module.scss";

interface Props {
  count: number;
}

const MoreButton: React.FC<Props> = ({ count }) => {
  const { spaceId } = useParams();
  const { push } = useRouter();

  return (
    <Button
      type="button"
      color="secondary"
      className={styles.wrapper}
      onClick={() => push(`/spaces/${spaceId}/reviews`)}
    >
      {count}개 리뷰 더보기
    </Button>
  );
};

export default MoreButton;
