"use client";

import Link from "next/link";

import type { ReservationDetail } from "@/common/types/reservation";
import { Button } from "@/components";

import styles from "./writeReviewButton.module.scss";

interface Props {
  reservation: ReservationDetail;
}

const WriteReviewButton: React.FC<Props> = ({ reservation }) => {
  if (!reservation.isReviewable) return null;

  return (
    <section className={styles.wrapper}>
      <Link href={`/reservations/${reservation.id}/write-review`}>
        <Button color="secondary" full>
          후기 쓰기
        </Button>
      </Link>
    </section>
  );
};

export default WriteReviewButton;
