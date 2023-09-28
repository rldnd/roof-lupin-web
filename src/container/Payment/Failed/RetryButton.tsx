"use client";

import Link from "next/link";

import { useAtomValue } from "jotai";

import { Button } from "@/components";
import { reservationState } from "@/states";

import styles from "./retryButton.module.scss";

const RetryButton: React.FC = () => {
  const { spaceId } = useAtomValue(reservationState);

  return (
    <footer className={styles.wrapper}>
      <Link href={`/spaces/${spaceId}`}>
        <Button type="button" color="primary" full>
          다시 시도 하기
        </Button>
      </Link>
    </footer>
  );
};

export default RetryButton;
