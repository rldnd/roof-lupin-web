"use client";

import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components";

import styles from "./totalButton.module.scss";

const TotalButton: React.FC = () => {
  const { spaceId } = useParams();
  const { push } = useRouter();

  return (
    <Button
      type="button"
      color="secondary"
      className={styles.wrapper}
      onClick={() => push(`/spaces/${spaceId}/reviews?hasPhoto=true`)}
    >
      포토 리뷰 전체보기
    </Button>
  );
};

export default TotalButton;
